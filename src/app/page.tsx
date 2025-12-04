"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarHeart,
  CalendarPlus,
  Clock,
  MapPin,
  Music2,
  Navigation,
  Send,
  Sparkles,
} from "lucide-react";

const EVENT_DATE = new Date("2026-01-05T20:00:00-03:00");
const EVENT_END = new Date("2026-01-06T04:00:00-03:00");
const EVENT_LOCATION = {
  name: "Terraza Av. Perú 1268",
  address: "Av. Perú 1268, Recoleta, Santiago de Chile",
};

const DESIGN_ASSETS = {
  heroBackground: "/galeria/fondo-hero.png",
  rings: "/galeria/anillos-diseno.png",
  coupleOne: "/galeria/diseno-pareja-1.png",
  coupleTwo: "/galeria/diseno-pareja-2.png",
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const getCountdown = (target: Date): Countdown => {
  const total = target.getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<Countdown>(() =>
    getCountdown(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  tone?: "neutral" | "rose" | "sage";
};

const SectionShell = ({ id, children, tone = "neutral" }: SectionShellProps) => {
  const tones: Record<SectionShellProps["tone"], string> = {
    neutral: "bg-white/70",
    rose: "bg-[rgba(242,217,208,0.65)]",
    sage: "bg-[rgba(156,170,133,0.16)]",
  };

  return (
    <motion.section
      id={id}
      className="snap-center flex min-h-[92vh] w-full items-center justify-center px-4 py-14 sm:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className={`glass-panel w-full max-w-4xl rounded-[32px] border border-white/40 p-8 sm:p-12 ${tones[tone]}`}
      >
        {children}
      </div>
    </motion.section>
  );
};

const buildICSLink = () => {
  const pad = (value: number) => `${value}`.padStart(2, "0");
  const formatDate = (date: Date) =>
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;

  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Carlos y Camila//Wedding Invite//ES
BEGIN:VEVENT
UID:carlos-camila-wedding
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(EVENT_DATE)}
DTEND:${formatDate(EVENT_END)}
SUMMARY:Matrimonio de Carlos & Camila
LOCATION:${EVENT_LOCATION.name}, ${EVENT_LOCATION.address}
DESCRIPTION:Celebramos el viaje que comenzó con un “hola” y nos lleva hasta este día. Queremos compartirlo contigo.
END:VEVENT
END:VCALENDAR
`.trim();

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};

const storyMoments = [
  {
    title: "Match inesperado",
    text: "Un café rápido que terminó siendo la conversa más larga del mes.",
    year: "2019",
    art: DESIGN_ASSETS.coupleOne,
  },
  {
    title: "Mudanza compartida",
    text: "De cajas y plantas a un hogar lleno de playlists y brunchs.",
    year: "2021",
    art: DESIGN_ASSETS.coupleTwo,
  },
  {
    title: "El sí en la costa",
    text: "Anillo, mar y una pregunta que solo podía tener una respuesta.",
    year: "2024",
    art: DESIGN_ASSETS.rings,
  },
];

const detailItems = [
  {
    Icon: CalendarHeart,
    title: "Ceremonia + fiesta",
    subtitle: "05 · Enero · 2026",
    description: "Recepción a las 19:00 hrs · dress code formal relajado",
  },
  {
    Icon: Clock,
    title: "Agenda viva",
    subtitle: "Golden hour + cena + fiesta",
    description:
      "Queremos que vivas cada bloque; prepárate para música en vivo y DJ.",
  },
  {
    Icon: MapPin,
    title: EVENT_LOCATION.name,
    subtitle: EVENT_LOCATION.address,
    description: "Estamos en pleno Recoleta, coordina tu llegada con anticipación.",
  },
];

const mapsEmbedUrl =
  "https://maps.google.com/maps?q=Av.%20Per%C3%BA%201268,%20Recoleta,%20Chile&z=15&ie=UTF8&iwloc=&output=embed";

const mapsLink =
  "https://www.google.com/maps/place/Av.+Per%C3%BA+1268,+8420177+Recoleta,+Regi%C3%B3n+Metropolitana/data=!4m2!3m1!1s0x9662c5ebf863ffff:0xb6fa4a765202ede2?sa=X&ved=1t:242&ictx=111";

const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(EVENT_LOCATION.address)}`;

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={() => setIsPlaying((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-lavender)]/80 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]"
      >
        <Music2 className="h-4 w-4" />
        {isPlaying ? "Pausar música" : "Play música"}
      </button>
      <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-terracotta)]">
        No suena automáticamente ✨
      </span>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_2b9c22fc8a.mp3?filename=gentle-ambient-14083.mp3"
      />
    </div>
  );
};

const HeroSection = () => {
  const [tapCount, setTapCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    if (tapCount === 0) return;
    const timeout = setTimeout(() => setTapCount(0), 500);
    return () => clearTimeout(timeout);
  }, [tapCount]);

  const handleTap = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) {
      return;
    }
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setShowEasterEgg(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <motion.section
      id="cover"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleTap}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,155,196,0.25),transparent_55%)]" />
      <div className="absolute inset-x-6 bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-[var(--color-taupe)] sm:hidden">
        <span>desliza</span>
        <div className="h-12 w-px bg-[var(--color-taupe)]/60" />
      </div>
      <motion.div
        className="relative glass-panel flex w-full max-w-4xl flex-col gap-8 rounded-[36px] border border-white/50 bg-white/70 p-8 text-center sm:p-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[36px]">
          <Image
            src={DESIGN_ASSETS.heroBackground}
            alt="Textura artística en tonos crema y lavanda"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.5em] text-[var(--color-terracotta)]">
          <Sparkles className="h-4 w-4" />
          Nuestra celebración
        </div>
        <motion.h1
          className="font-serif text-4xl leading-tight text-[var(--color-sage-900)] sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Carlos & Camila
        </motion.h1>
        <motion.p
          className="text-base text-[var(--color-taupe)] sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Celebramos el viaje que empezó con un “hola” y nos trae hasta este día.
          Queremos compartirlo contigo.
        </motion.p>
        <motion.p
          className="text-sm font-medium tracking-[0.4em] text-[var(--color-sage-900)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          05 · 01 · 2026 · Santiago de Chile
        </motion.p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#historia"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            Descubre nuestra historia
          </Link>
          <Link
            href="#rsvp"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-terracotta)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-terracotta)] transition hover:bg-[var(--color-terracotta)]/10"
          >
            Confirmar asistencia
          </Link>
        </div>
        <MusicToggle />
        {showEasterEgg && (
          <motion.p
            className="rounded-full bg-[var(--color-soft-rose)]/60 px-5 py-2 text-xs text-[var(--color-terracotta)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            ✨ Nos encanta que explores. Pregunta por el código secreto al llegar.
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  );
};

const CountdownSection = () => {
  const timeLeft = useCountdown(EVENT_DATE);
  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <SectionShell id="contador" tone="rose">
      <div className="flex flex-col gap-8 text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
          Cuenta regresiva
        </div>
        <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-5xl">
          Falta muy poquito
        </h2>
        <p className="text-sm text-[var(--color-taupe)] sm:text-base">
          Ajusta la playlist, confirma tu look y activa la emoción.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              className="rounded-3xl border border-white/50 bg-white/60 px-4 py-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                key={`${unit.label}-${unit.value}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl text-[var(--color-sage-900)]"
              >
                {`${unit.value}`.padStart(2, "0")}
              </motion.div>
              <p className="mt-2 text-xs uppercase tracking-[0.4em] text-[var(--color-taupe)]">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

const StorySection = () => {
  return (
    <SectionShell id="historia" tone="neutral">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
            Nuestra historia
          </p>
          <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-4xl">
            Cartas que se deslizan, recuerdos que se quedan
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {storyMoments.map((moment, index) => (
            <motion.article
              key={moment.title}
              className="relative min-w-[220px] snap-center overflow-hidden rounded-3xl bg-white/80 p-5 shadow-lg"
              whileHover={{ y: -6 }}
            >
              <div className="pointer-events-none absolute -right-6 -top-4 h-32 w-32 opacity-70">
                <Image
                  src={moment.art}
                  alt={`Ilustración ${moment.title}`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-taupe)]">
                {moment.year}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[var(--color-sage-900)]">
                {moment.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-taupe)]">
                {moment.text}
              </p>
              <motion.div
                className="mt-6 h-1 rounded-full bg-[var(--color-lavender)]/70"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

const DesignsSection = () => {
  return (
    <SectionShell id="disenos" tone="sage">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
            Diseño personalizado
          </p>
          <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-4xl">
            Arte que acompaña cada sección
          </h2>
          <p className="text-sm text-[var(--color-taupe)]">
            Estas ilustraciones acompañan todo el flujo en vez de una galería clásica. Son
            responsivas y se animan suavemente para que la experiencia siempre se sienta viva.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative h-72 overflow-hidden rounded-[36px] border border-white/60 bg-white/60 shadow-lg">
            <Image
              src={DESIGN_ASSETS.coupleOne}
              alt="Ilustración pareja 1"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain p-6"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
              Cover & Historia
            </p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[36px] border border-white/60 bg-white/60 shadow-lg">
            <Image
              src={DESIGN_ASSETS.coupleTwo}
              alt="Ilustración pareja 2"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-6"
              priority
            />
            <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
              Detalles & RSVP
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const DetailsSection = () => {
  return (
    <SectionShell id="detalles" tone="neutral">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
              Detalles clave
            </p>
            <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-4xl">
              Todo lo que tienes que saber
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {detailItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-lg"
              >
                <item.Icon className="h-8 w-8 text-[var(--color-terracotta)]" />
                <h3 className="mt-4 font-serif text-2xl text-[var(--color-sage-900)]">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-[var(--color-taupe)]">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm text-[var(--color-sage-900)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-8 flex-1 overflow-hidden rounded-[36px] border border-white/60 bg-white/70 shadow-lg lg:mt-0">
          <Image
            src={DESIGN_ASSETS.rings}
            alt="Diseño de anillos entrelazados"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain p-8"
            priority
          />
          <div className="absolute bottom-6 left-6 rounded-full bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
            Ceremonia
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const MapSection = () => {
  return (
    <SectionShell id="mapa" tone="sage">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
            Cómo llegar
          </p>
          <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-4xl">
            Guarda la ubicación
          </h2>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/60 shadow-lg">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="320"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa del evento"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={mapsLink}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <MapPin className="h-4 w-4" />
            Ver en Google Maps
          </Link>
          <Link
            href={uberUrl}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-terracotta)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-terracotta)] transition hover:bg-[var(--color-terracotta)]/10"
          >
            <Navigation className="h-4 w-4" />
            Ir en Uber
          </Link>
        </div>
      </div>
    </SectionShell>
  );
};

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    // Placeholder para conexión real (Supabase/Firebase)
    setTimeout(() => {
      setStatus("done");
    }, 1200);
  };

  return (
    <SectionShell id="rsvp" tone="rose">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
            RSVP
          </p>
          <h2 className="font-serif text-3xl text-[var(--color-sage-900)] sm:text-4xl">
            ¿Nos acompañas?
          </h2>
          <p className="text-sm text-[var(--color-taupe)]">
            Solo dinos tu nombre y cuántos vienen contigo. Te responderemos por WhatsApp o mail.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2"
          autoComplete="off"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-taupe)]">
              Nombre
            </span>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-[var(--color-sage-900)] outline-none focus:border-[var(--color-terracotta)]/70"
              placeholder="Ej: Camila Soto"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-taupe)]">
              Acompañantes
            </span>
            <input
              required
              type="number"
              name="guests"
              min={0}
              max={8}
              value={formData.guests}
              onChange={handleChange}
              className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-[var(--color-sage-900)] outline-none focus:border-[var(--color-terracotta)]/70"
              placeholder="Número de acompañantes"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? "Enviando..." : "Enviar respuesta"}
            </button>
            {status === "done" && (
              <p
                className="mt-3 rounded-full bg-white/70 px-5 py-2 text-center text-sm text-[var(--color-sage-900)]"
                role="status"
              >
                ¡Nos vemos en la boda! Te confirmaremos tu cupo directamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </SectionShell>
  );
};

const FinalSection = () => {
  const icsLink = buildICSLink();
  return (
    <SectionShell id="final" tone="neutral">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-terracotta)]">
          Nos vemos pronto
        </p>
        <h2 className="font-serif text-4xl text-[var(--color-sage-900)]">
          Gracias por ser parte
        </h2>
        <p className="text-sm text-[var(--color-taupe)] sm:text-base">
          Guárdalo en tu calendario y comparte esta invitación con quienes reciban
          el QR. Cada invitado tendrá su código personalizado.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={icsLink}
            download="carlos-camila.ics"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <CalendarPlus className="h-4 w-4" />
            Agregar al calendario
          </Link>
          <Link
            href="#cover"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-terracotta)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-terracotta)] transition hover:bg-[var(--color-terracotta)]/10"
          >
            Volver al inicio
          </Link>
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-taupe)]">
          05 · 01 · 2026 · #WeddingCarlosCamila
        </p>
      </div>
    </SectionShell>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-white/50 via-transparent to-white/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),transparent_55%)]" />
      <main className="relative z-10 flex h-dvh snap-y snap-mandatory flex-col overflow-y-scroll">
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <DesignsSection />
        <DetailsSection />
        <MapSection />
        <RSVPSection />
        <FinalSection />
      </main>
    </div>
  );
}
