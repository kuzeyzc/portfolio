"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useDeferredAnimationsEffect } from "@/hooks/use-deferred-animations";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT_LINKS } from "@/lib/contact-data";
import { SITE_LINKS } from "@/lib/site-links";
import { ArrowRight, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/language-provider";

// ─── EmailJS Config ───
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const contactFormFieldClass =
  "h-auto w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-4 text-base md:text-lg text-black placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white focus-visible:border-transparent transition-all duration-300 shadow-none";

const contactFormLabelClass = "block text-sm font-medium text-black/80 mb-2 ml-2";

export function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  // ── Form handlers ──
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
        toast.error(t.contact.toast.fillAll, {
          icon: <AlertCircle size={18} />,
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        toast.error(t.contact.toast.invalidEmail, {
          icon: <AlertCircle size={18} />,
        });
        return;
      }

      setSending(true);

      try {
        const emailjs = await import("@emailjs/browser");

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formState.name,
            email: formState.email,
            message: formState.message,
          },
          EMAILJS_PUBLIC_KEY
        );

        toast.success(t.contact.toast.success, {
          icon: <CheckCircle2 size={18} />,
        });

        setFormState({ name: "", email: "", message: "" });
      } catch {
        toast.error(t.contact.toast.error, {
          icon: <AlertCircle size={18} />,
          description: SITE_LINKS.email.replace("mailto:", ""),
        });
      } finally {
        setSending(false);
      }
    },
    [formState, t.contact.toast]
  );

  // ── GSAP Scroll Animations ──
  useDeferredAnimationsEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, formRef.current, dividerRef.current, stripsRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const headingSplit = new SplitText(headingRef.current, {
      type: "words",
      wordsClass: "contact-word",
    });

    const ctx = gsap.context(() => {
      // Heading word stagger
      gsap.fromTo(
        headingSplit.words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Form entrance
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Divider draw
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Link strips stagger
      if (stripsRef.current) {
        const strips = stripsRef.current.querySelectorAll(".contact-strip");
        gsap.fromTo(
          strips,
          { opacity: 0, y: 24, x: -16 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stripsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      headingSplit.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden py-[clamp(4rem,12vh,10rem)]"
    >
      <Container className="relative" style={{ zIndex: 1 }}>
        {/* Heading — Satoshi Medium, conversational invitation */}
        <p
          ref={headingRef}
          className="font-body font-medium text-balance text-4xl md:text-6xl leading-[1.25] tracking-[-0.015em]"
          style={{
            color: "var(--text)",
          }}
        >
          {t.contact.heading}
        </p>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-12 flex flex-col gap-6"
          style={{ opacity: 0 }}
          noValidate
        >
          <div>
            <Label htmlFor="contact-name" className={contactFormLabelClass}>
              {t.contact.nameLabel}
            </Label>
            <Input
              id="contact-name"
              name="name"
              placeholder={t.contact.namePlaceholder}
              value={formState.name}
              onChange={handleChange}
              className={contactFormFieldClass}
              autoComplete="name"
            />
          </div>

          <div>
            <Label htmlFor="contact-email" className={contactFormLabelClass}>
              {t.contact.emailLabel}
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={formState.email}
              onChange={handleChange}
              className={contactFormFieldClass}
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="contact-message" className={contactFormLabelClass}>
              {t.contact.messageLabel}
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder={t.contact.messagePlaceholder}
              value={formState.message}
              onChange={handleChange}
              className={`${contactFormFieldClass} min-h-[160px] resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="contact-submit-glow w-full h-16 mt-2 rounded-full bg-black text-white text-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:bg-black"
            data-cursor-hover
          >
            {sending ? t.contact.submitting : t.contact.submit}
            {!sending && <ArrowUpRight size={20} strokeWidth={2} aria-hidden />}
          </button>
        </form>

        {/* Accent Divider */}
        <div
          ref={dividerRef}
          className="mt-12 sm:mt-16 h-0.5 w-full origin-left"
          style={{
            backgroundColor: "var(--accent-raw)",
            opacity: 0.4,
          }}
        />

        {/* Link Strips */}
        <div ref={stripsRef} className="mt-0">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="contact-strip group"
              data-cursor-hover
              aria-label={`${link.name} ${t.contact.visitLink}`}
            >
              {/* Left: Number + Name + Icon */}
              <div className="flex items-center gap-3 sm:gap-5">
                <span className="contact-strip-num font-mono text-[0.5625rem] sm:text-[0.6875rem] xl:text-[0.75rem] tracking-widest">
                  {link.number}
                </span>
                <link.icon
                  size={18}
                  className="contact-strip-icon transition-colors duration-300 hidden sm:block"
                  style={{ color: "var(--text)", opacity: 0.55 }}
                />
                <span
                  className="contact-strip-name font-display font-semibold tracking-[0.04em] uppercase"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                >
                  {link.name}
                </span>
              </div>

              {/* Right: Arrow */}
              <ArrowRight
                size={20}
                className="contact-strip-arrow transition-all duration-300"
                style={{ color: "var(--text)", opacity: 0.55 }}
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
