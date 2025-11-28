import { useEffect, useMemo, useRef, useState } from "react";

const swapImageModuleMap = import.meta.glob("./assets/sustitutos/*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

const swapImageUrls = Object.entries(swapImageModuleMap)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const productImageModuleMap = import.meta.glob("./assets/productos/*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

const productImageLookup = Object.fromEntries(
  Object.entries(productImageModuleMap).map(([path, url]) => {
    const fileName = path.split("/").pop()?.toLowerCase() ?? "";
    return [fileName, url];
  })
);

const personas = [
  {
    title: "Antojo relámpago",
    detail: "Cravings al instante sin salir."
  },
  {
    title: "Team RappiPay",
    detail: "Pagos y recargas en un tap."
  },
  {
    title: "Rappitenderos pro",
    detail: "Ruta clara para entregar sin estrés."
  },
  {
    title: "Fans del soporte",
    detail: "Soporte exprés cuando algo falla."
  }
];

const requisitos = [
  "iOS 13+ o Android 8+",
  "WiFi o datos estables",
  "Número móvil con SMS",
  "Tarjeta, PayPal o RappiPay",
  "Ubicación + notificaciones"
];

const secciones = [
  {
    title: "Descarga y arranca",
    quick: ["Instala la app", "Acepta notis", "Verifica código"],
    cta: "Guardé mi dirección"
  },
  {
    title: "Pon la casa a punto",
    quick: ["Direcciones con etiquetas", "Contactos de confianza", "PIN + biometría"],
    cta: "Perfil listo"
  },
  {
    title: "Tour por el inicio",
    quick: ["Busca por barra", "Explora promos", "Accede a RappiPay"],
    cta: "Entendido"
  },
  {
    title: "Arma tu pedido",
    quick: ["Elige restaurant", "Revisa tiempos", "Añade nota"],
    cta: "Pedir ahora"
  },
  {
    title: "Sigue cada paso",
    quick: ["Timeline en vivo", "Comparte tracking", "Chatea si necesitas"],
    cta: "Pedido visto"
  },
  {
    title: "Controla tu dinero",
    quick: ["Tarjetas seguras", "CashBack y transfer", "Alertas de gasto"],
    cta: "Finanzas al día"
  },
  {
    title: "Prime vibes",
    quick: ["Suscríbete", "Ahorro visible", "Cancela cuando quieras"],
    cta: "Me uno"
  },
  {
    title: "Soporte chill",
    quick: ["Ayuda rápida", "Reembolsos en taps", "Modo seguro"],
    cta: "Listo"
  },
  {
    title: "Tips de la casa",
    quick: ["Actualiza siempre", "Lee reseñas", "Comparte referidos"],
    cta: "Los aplico"
  },
  {
    title: "Cuando algo falla",
    quick: ["Reinicia app", "Reporta cobro", "Actualiza dirección"],
    cta: "Problema resuelto"
  }
];

const timeline = [
  {
    title: "Día 1",
    caption: "Setup express",
    icon: "⚡",
    chips: ["Instala", "Verifica", "Agrega dirección"]
  },
  {
    title: "Día 3",
    caption: "Pedido perfecto",
    icon: "🔥",
    chips: ["Explora promos", "Guarda favoritos", "Prueba Prime"]
  },
  {
    title: "Semana 2",
    caption: "Modo pro",
    icon: "🚀",
    chips: ["Usa RappiPay", "Listas compartidas", "CashBack activo"]
  }
];

const quickActions = [
  {
    label: "Recarga en segundos",
    description: "Recarga al instante.",
    action: "Inicio > RappiPay"
  },
  {
    label: "Activa Modo seguro",
    description: "PIN o biometría en entregas.",
    action: "Perfil > Seguridad"
  },
  {
    label: "Soluciona un pedido",
    description: "Reembolso, reemplazo o crédito.",
    action: "Pedidos > Resolver un problema"
  }
];

const advancedHacks = [
  {
    title: "Listas colaborativas",
    items: [
      "Lista por evento, link para tu crew.",
      "Activa recordatorios semanales."
    ]
  },
  {
    title: "Prime Travel & Live",
    items: [
      "Reserva vuelos y hoteles con CashBack.",
      "Únete a lives con descuentos anticipados."
    ]
  },
  {
    title: "Automatiza pagos",
    items: [
      "Programa servicios con cargo automático.",
      "Exporta comprobantes directo a tu correo."
    ]
  }
];

function ModalShell({ children, onClose, maxWidth = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10">
      <div className={`relative w-full rounded-3xl bg-white shadow-2xl ${maxWidth}`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-bold text-rappi-graphite shadow-sm"
          aria-label="Cerrar"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

const journeys = [
  {
    id: "pro",
    pill: "RappiPro",
    tag: "Oferta especial",
    headline: "Envíos GRATIS y mucho más",
    title: "¡Ahorra en serio con RappiPro!",
    highlight: "Disfruta 49% de descuento en tu plan anual.",
    subcopy: "Con solo 4 pedidos al mes recuperas la inversión.",
    price: "$119.999 por 12 meses",
    renewal: "Después $23.490/mes (renovación automática)",
    perks: [
      {
        title: "Envíos GRATIS siempre",
        detail: "Sin costo extra en tus pedidos.",
        iconBg: "bg-amber-100",
        iconLabel: "👑"
      },
      {
        title: "Tarifa con descuento",
        detail: "Servicio express con precio amigo.",
        iconBg: "bg-orange-100",
        iconLabel: "💸"
      },
      {
        title: "Acceso exclusivo",
        detail: "Ofertas Pro primero para ti.",
        iconBg: "bg-lime-100",
        iconLabel: "⭐"
      }
    ],
    actions: [
      { label: "Quiero ser Pro", tone: "primary", action: "join" },
      { label: "Renovar mi plan", tone: "ghost", action: "renew" }
    ]
  },
  {
    id: "swap",
    pill: "Sustitutos",
    tag: "Upsell inteligente",
    headline: "¡Ey! Hay descuentos nuevos",
    title: "Ballantine's Finest Whisky",
    highlight: "Ahora en $57.520 (20% de ahorro)",
    subcopy: "Si se acaba, elegimos algo parecido o te dejamos decidir.",
    perks: [
      {
        title: "Cambiar preferencia",
        detail: "Elige tú el sustituto o deja que decidamos.",
        iconBg: "bg-rappi-orange/10",
        iconLabel: "🔄"
      },
      {
        title: "Mensaje al shopper",
        detail: "Deja un tip para la botella perfecta.",
        iconBg: "bg-rappi-coral/20",
        iconLabel: "💬"
      }
    ],
    imageFile: "finest-whisky.png",
    imageLabel: "Ballantine's Finest Whisky",
    extras: [
      "Busca el sello Ballantine's para validar la promo.",
      "Si quieres opciones, desliza y mira recomendaciones con emojis."
    ],
    actions: [
      { label: "Cambiar preferencia", tone: "primary", action: "preference" },
      { label: "Escribir mensaje", tone: "ghost", action: "message" }
    ]
  },
  {
    id: "note",
    pill: "Notas",
    tag: "Brief para el shopper",
    headline: "Diles exactamente qué necesitas",
    title: "Deja una nota para quien hará tu compra",
    highlight: "Cuenta el truco: ‘prefiero botella de vidrio’ o ‘sin bolsa’.",
    subcopy: "Mientras más claro seas, más rápido llega lo que quieres.",
    perks: [
      {
        title: "Texto rápido",
        detail: "Caja limpia con placeholder útil.",
        iconBg: "bg-sky-100",
        iconLabel: "✍️"
      },
      {
        title: "Confirmación verde",
        detail: "Botón verde confirma guardado.",
        iconBg: "bg-emerald-100",
        iconLabel: "✅"
      }
    ],
    actions: [
      { label: "Guardar mensaje", tone: "primary", action: "save" }
    ]
  }
];

function App() {
  const mitad = useMemo(() => Math.ceil(secciones.length / 2), []);
  const primeraColumna = secciones.slice(0, mitad);
  const segundaColumna = secciones.slice(mitad);
  const checklistRef = useRef(null);
  const seccionesRef = useRef(null);
  const quickActionsRef = useRef(null);
  const advancedRef = useRef(null);
  const proActionTimeoutRef = useRef(null);
  const [copiedAction, setCopiedAction] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeJourney, setActiveJourney] = useState(0);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [preferenceChoice, setPreferenceChoice] = useState("similar");
  const [preferenceSaved, setPreferenceSaved] = useState(false);
  const [journeyActionStatus, setJourneyActionStatus] = useState(null);
  const [selectedSwapImage, setSelectedSwapImage] = useState(0);
  const currentJourney = journeys[activeJourney];
  const isSwapJourney = currentJourney.id === "swap";
  const isProJourney = currentJourney.id === "pro";
  const journeyProductImage = currentJourney.imageFile
    ? productImageLookup[currentJourney.imageFile.toLowerCase()]
    : undefined;
  const journeyWrapperClass = isSwapJourney || isProJourney
    ? "mt-10 flex justify-center"
    : "mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]";
  const journeyCardClass = `rounded-3xl border border-white/70 bg-white/95 p-8 shadow-2xl shadow-orange-500/10 ${
    isSwapJourney ? "mx-auto max-w-lg" : isProJourney ? "mx-auto max-w-2xl text-center" : ""
  }`;
  const actionContainerClass = `mt-8 flex flex-wrap gap-3 ${
    isSwapJourney || isProJourney ? "justify-center" : ""
  }`;
  const swapImages = useMemo(() => {
    const base = swapImageUrls.slice(0, 3);
    if (base.length < 3) {
      return [...base, ...Array(3 - base.length).fill(null)];
    }
    return base;
  }, []);
  const preferenceOptions = useMemo(
    () => [
      {
        value: "similar",
        label: "Elegir sustituto similar",
        detail: "Buscamos algo del mismo rango y avisamos en la app."
      },
      {
        value: "ping",
        label: "Avisarme antes",
        detail: "El shopper te escribe para confirmar cada cambio."
      },
      {
        value: "none",
        label: "Sin sustitutos",
        detail: "Si no hay stock, eliminamos el producto del pedido."
      }
    ],
    []
  );

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQuickAction = (action) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(action)
        .then(() => setCopiedAction(action))
        .catch(() => setCopiedAction(""));
    } else {
      setCopiedAction(action);
      window.prompt("Ruta rápida (cópiala manual):", action);
    }
  };

  const handlePrint = () => window.print();

  const handleToggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  const handleJourneyAction = (actionType) => {
    if (!actionType) {
      return;
    }

    if (isProJourney && (actionType === "join" || actionType === "renew")) {
      if (proActionTimeoutRef.current) {
        clearTimeout(proActionTimeoutRef.current);
        proActionTimeoutRef.current = null;
      }

      const loadingMessage =
        actionType === "join"
          ? "Confirmando tu suscripción anual..."
          : "Procesando renovación de tu plan...";
      const successMessage =
        actionType === "join"
          ? "Listo, activamos RappiPro por 12 meses con 49% de descuento."
          : "Renovación confirmada. Mantienes todos los beneficios sin pausas.";

      setJourneyActionStatus({ type: actionType, phase: "loading", message: loadingMessage });

      proActionTimeoutRef.current = setTimeout(() => {
        setJourneyActionStatus({ type: actionType, phase: "success", message: successMessage });
        proActionTimeoutRef.current = null;
      }, 1100);
      return;
    }

    if (isSwapJourney && actionType === "preference") {
      setShowPreferenceModal(true);
      return;
    }

    if (isSwapJourney && actionType === "message") {
      setShowMessageModal(true);
      return;
    }
  };

  const closeModals = () => {
    setShowPreferenceModal(false);
    setShowMessageModal(false);
    setMessageSent(false);
    setNoteText("");
    setPreferenceSaved(false);
    setPreferenceChoice("similar");
    setSelectedSwapImage(0);
  };

  const submitNote = () => {
    if (!noteText.trim()) {
      return;
    }
    setMessageSent(true);
  };

  const confirmPreference = () => {
    setPreferenceSaved(true);
  };

  useEffect(() => {
    if (!copiedAction) {
      return;
    }

    const timeout = setTimeout(() => setCopiedAction(""), 2600);
    return () => clearTimeout(timeout);
  }, [copiedAction]);

  useEffect(() => {
    if (showAdvanced && advancedRef.current) {
      advancedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAdvanced]);

  useEffect(() => {
    setJourneyActionStatus(null);
    if (proActionTimeoutRef.current) {
      clearTimeout(proActionTimeoutRef.current);
      proActionTimeoutRef.current = null;
    }
  }, [activeJourney]);

  useEffect(() => {
    if (journeyActionStatus?.phase === "success") {
      const timeout = setTimeout(() => setJourneyActionStatus(null), 2600);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [journeyActionStatus]);

  useEffect(() => () => {
    if (proActionTimeoutRef.current) {
      clearTimeout(proActionTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (!showPreferenceModal) {
      return;
    }

    const firstAvailable = swapImages.findIndex((item) => Boolean(item));
    setSelectedSwapImage(firstAvailable >= 0 ? firstAvailable : 0);
  }, [showPreferenceModal, swapImages]);

  return (
    <div className="min-h-screen bg-sunny bg-no-repeat text-rappi-graphite">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
        <header className="relative z-10 px-6 pt-12 pb-16 sm:px-10 lg:px-24">
          <div className="max-w-5xl">
            <span className="inline-block rounded-full border border-white/70 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rappi-graphite/70 shadow-sm">
              Guía Rappi Lovers 2025
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-rappi-graphite sm:text-5xl lg:text-6xl">
              Manual visual para usar Rappi sin vueltas.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-rappi-graphite/80 sm:text-xl">
              Puro paso clave, copy corto y mucha acción para que te animes a probarlo ya.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo(checklistRef)}
                className="rounded-full bg-gradient-to-r from-rappi-orange via-rappi-coral to-rappi-peach px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30"
              >
                Ver recorrido express
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-full border border-rappi-orange/40 bg-white/80 px-7 py-3 text-sm font-semibold text-rappi-orange transition hover:bg-white"
              >
                Guardar en PDF
              </button>
            </div>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-rappi-peach/40 to-transparent" />
          </div>
        </header>
      </div>

      <main className="relative z-10 space-y-24 pb-24">
        <section className="px-6 sm:px-10 lg:px-24">
          <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">¿Quién se enamora de Rappi?</h2>
          <p className="mt-3 max-w-3xl text-sm text-rappi-graphite/70">
            Si te identificas con alguno de estos perfiles, este manual está hecho para ti.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {personas.map(({ title, detail }) => (
              <article key={title} className="section-card h-full p-6 transition hover:-translate-y-1 hover:border-rappi-orange/40">
                <h3 className="text-lg font-semibold text-rappi-graphite">{title}</h3>
                <p className="mt-3 text-sm text-rappi-graphite/70">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={checklistRef} className="px-6 sm:px-10 lg:px-24">
          <div className="section-card p-8 sm:p-10">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-rappi-graphite">Checklist rápido</h2>
                <p className="text-sm text-rappi-graphite/70">Deja todo listo y evita contratiempos en tu primer pedido.</p>
              </div>
              <span className="rounded-full bg-rappi-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">Paso 1</span>
            </header>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {requisitos.map((item) => (
                <div key={item} className="rounded-2xl border border-white/60 bg-white/90 px-4 py-6 text-sm text-rappi-graphite/80 shadow-md">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={seccionesRef} className="px-6 sm:px-10 lg:px-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {primeraColumna.map(({ title, quick, cta }) => (
                <article key={title} className="section-card p-6">
                  <h3 className="text-xl font-semibold text-rappi-graphite">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-rappi-graphite/80">
                    {quick.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full bg-rappi-orange/10 px-3 py-1 font-medium text-rappi-orange"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center rounded-full border border-rappi-orange/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-rappi-orange"
                  >
                    {cta}
                  </button>
                </article>
              ))}
            </div>
            <div className="space-y-6">
              {segundaColumna.map(({ title, quick, cta }) => (
                <article key={title} className="section-card p-6">
                  <h3 className="text-xl font-semibold text-rappi-graphite">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-rappi-graphite/80">
                    {quick.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full bg-rappi-coral/10 px-3 py-1 font-medium text-rappi-coral"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center rounded-full border border-rappi-coral/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-rappi-coral"
                  >
                    {cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-24">
          <div className="section-card overflow-hidden">
            <div className="grid gap-0 md:grid-cols-3">
              {timeline.map(({ title, caption, icon, chips }, index) => (
                <article
                  key={title}
                  className="relative flex flex-col gap-6 px-8 py-10 md:border-l md:border-white/60"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rappi-graphite/60">{title}</p>
                      <h3 className="text-lg font-semibold text-rappi-graphite">{caption}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-rappi-graphite/70">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-rappi-orange/10 px-3 py-1 text-rappi-orange"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-rappi-graphite/50">
                    {index === 0 ? "Calienta motores" : index === 1 ? "Disfruta el camino" : "Sigue escalando"}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 lg:px-24">
          <div className="section-card p-8 sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">Momentos clave en la app</h2>
                <p className="mt-2 max-w-2xl text-sm text-rappi-graphite/70">
                  Inspírate con pantallas reales rediseñadas: cada paso usa microcopy directo y visuales cálidos para que tu usuario diga “sí, quiero”.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {journeys.map(({ id, pill, title }, index) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveJourney(index)}
                    aria-pressed={activeJourney === index}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-rappi-orange/50 ${
                      activeJourney === index
                        ? "border-rappi-orange bg-rappi-orange text-white"
                        : "border-rappi-orange/30 bg-white text-rappi-graphite hover:border-rappi-orange/60"
                    }`}
                  >
                    {pill || title}
                  </button>
                ))}
              </div>
            </div>

            <div className={journeyWrapperClass}>
              <div className={journeyCardClass}>
                <span className="inline-flex items-center gap-2 rounded-full bg-rappi-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                  <span>✨</span>
                  {journeys[activeJourney].tag}
                </span>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-rappi-graphite/60">
                  {journeys[activeJourney].headline}
                </h3>
                <h4 className="mt-2 text-3xl font-semibold text-rappi-graphite sm:text-4xl">
                  {journeys[activeJourney].title}
                </h4>
                <p className="mt-4 text-sm text-rappi-graphite/75">{journeys[activeJourney].highlight}</p>
                {journeys[activeJourney].subcopy && (
                  <p className="mt-1 text-xs text-rappi-graphite/60">{journeys[activeJourney].subcopy}</p>
                )}
                {isSwapJourney && currentJourney.imageFile && (
                  <div className="mt-6 flex justify-center">
                    {journeyProductImage ? (
                      <img
                        src={journeyProductImage}
                        alt={currentJourney.imageLabel || currentJourney.title}
                        className="h-40 w-auto rounded-3xl border border-white/60 bg-white object-contain shadow-inner shadow-orange-500/10"
                      />
                    ) : (
                      <div className="flex h-40 w-32 items-center justify-center rounded-3xl border-2 border-dashed border-rappi-orange/30 bg-white/70 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange/60">
                        Añade PNG
                      </div>
                    )}
                  </div>
                )}
                {journeys[activeJourney].price && (
                  <p className="mt-6 text-lg font-semibold text-rappi-orange">{journeys[activeJourney].price}</p>
                )}
                {journeys[activeJourney].renewal && (
                  <p className="text-xs text-rappi-graphite/60">{journeys[activeJourney].renewal}</p>
                )}
                <div className={`mt-8 space-y-4 ${isProJourney ? "mx-auto max-w-xl" : ""}`}>
                  {journeys[activeJourney].perks.map(({ title, detail, iconBg, iconLabel }) => (
                    <div
                      key={title}
                      className={`rounded-2xl bg-white/80 p-4 shadow-inner shadow-orange-500/5 ${
                        isProJourney ? "flex flex-col items-center gap-3 text-center" : "flex items-start gap-4"
                      }`}
                    >
                      <span
                        className={`flex ${isProJourney ? "h-12 w-12" : "h-10 w-10"} items-center justify-center rounded-full text-lg ${iconBg}`}
                      >
                        {iconLabel}
                      </span>
                      <div className={isProJourney ? "space-y-1 text-center" : ""}>
                        <p className="font-semibold text-rappi-graphite">{title}</p>
                        <p className="text-sm text-rappi-graphite/70">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={actionContainerClass}>
                  {journeys[activeJourney].actions.map(({ label, tone, action }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleJourneyAction(action)}
                      className={`rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rappi-orange/50 ${
                        tone === "primary"
                          ? "bg-rappi-orange text-white shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-orange-500/30"
                          : "border border-rappi-orange/30 bg-white text-rappi-orange hover:border-rappi-orange"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {isProJourney && journeyActionStatus && (
                  <div
                    className={`mt-5 rounded-3xl border p-5 text-sm transition ${
                      journeyActionStatus.phase === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rappi-orange/30 bg-rappi-orange/5 text-rappi-orange"
                    }`}
                  >
                    {journeyActionStatus.phase === "loading" ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="inline-flex h-4 w-4 items-center justify-center">
                          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-rappi-orange border-t-transparent" aria-hidden="true" />
                        </span>
                        <span className="font-semibold">{journeyActionStatus.message}</span>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-semibold">Todo listo ✨</p>
                        <p className="text-xs text-emerald-600/80">{journeyActionStatus.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!isSwapJourney && !isProJourney && journeys[activeJourney].extras && (
                <aside className="flex flex-col justify-between gap-6">
                  <div className="rounded-3xl border border-rappi-orange/20 bg-rappi-orange/5 p-6 text-sm text-rappi-graphite/80">
                    <p className="font-semibold text-rappi-orange">Detalles a cuidar</p>
                    <ul className="mt-3 space-y-2">
                      {journeys[activeJourney].extras.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rappi-orange" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        <section ref={quickActionsRef} className="px-6 sm:px-10 lg:px-24">
          <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">Acciones express</h2>
          <p className="mt-3 max-w-2xl text-sm text-rappi-graphite/70">Botones de confianza para resolver lo que más usas sin dar vueltas.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {quickActions.map(({ label, description, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickAction(action)}
                className="section-card flex h-full flex-col justify-between p-6 text-left transition hover:-translate-y-1 hover:border-rappi-orange/40 focus:outline-none focus:ring-2 focus:ring-rappi-orange/50"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">Destacado</p>
                  <h3 className="mt-3 text-xl font-semibold text-rappi-graphite">{label}</h3>
                  <p className="mt-4 text-sm text-rappi-graphite/70">{description}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-rappi-graphite/80">
                  <span className="rounded-full border border-rappi-orange/40 bg-rappi-orange/10 px-3 py-1">Ruta</span>
                  <span>{action}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-12 pt-10 sm:px-10 lg:px-24">
        <div className="section-card flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-rappi-graphite">Ahora sí, a disfrutar.</h2>
            <p className="mt-2 text-sm text-rappi-graphite/70">Guarda este manual, compártelo con tu crew y vuelve cuando salgan novedades.</p>
          </div>
          <button
            type="button"
            onClick={handleToggleAdvanced}
            className="rounded-full border border-rappi-orange/40 bg-white/80 px-7 py-3 text-sm font-semibold text-rappi-orange transition hover:bg-white"
          >
            {showAdvanced ? "Ocultar hacks" : "Ver hacks avanzados"}
          </button>
        </div>
      </footer>
      {showAdvanced && (
        <section ref={advancedRef} className="relative z-10 px-6 pb-24 pt-10 sm:px-10 lg:px-24">
          <div className="section-card p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-rappi-graphite sm:text-3xl">Hacks avanzados</h2>
                <p className="text-sm text-rappi-graphite/70">Ideas pro para sacarle cada gota al ecosistema Rappi y sorprender a tu círculo.</p>
              </div>
              <span className="rounded-full bg-rappi-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                Modo experto
              </span>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {advancedHacks.map(({ title, items }) => (
                <article key={title} className="rounded-3xl border border-rappi-orange/20 bg-white/90 p-6 shadow-xl shadow-orange-500/10">
                  <h3 className="text-lg font-semibold text-rappi-graphite">{title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-rappi-graphite/75">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-rappi-peach" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {showMessageModal && (
        <ModalShell onClose={closeModals} maxWidth="max-w-3xl">
          <div className="grid gap-6 p-8">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-rappi-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                  Sustitutos
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-rappi-graphite">Escribe un mensaje rápido</h2>
                  <p className="text-sm text-rappi-graphite/70">Cuenta en una línea qué esperas del reemplazo. El shopper lo ve al instante.</p>
                </div>
              </div>
              {messageSent && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                  ✅ Mensaje enviado
                </span>
              )}
            </header>

            {!messageSent ? (
              <>
                <div className="space-y-4">
                  <label htmlFor="swap-note" className="block text-xs font-semibold uppercase tracking-[0.3em] text-rappi-graphite/50">
                    Comparte detalles
                  </label>
                  <textarea
                    id="swap-note"
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                    rows={4}
                    placeholder="Ej: Si no hay Ballantine's, búscame un whisky suave y revisa fecha de caducidad."
                    className="w-full resize-none rounded-2xl border border-rappi-orange/30 bg-white/80 p-4 text-sm text-rappi-graphite shadow-inner shadow-orange-500/5 focus:border-rappi-orange focus:outline-none focus:ring-2 focus:ring-rappi-orange/20"
                  />
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-full border border-rappi-orange/30 bg-white px-6 py-3 text-sm font-semibold text-rappi-orange transition hover:border-rappi-orange"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={submitNote}
                    disabled={!noteText.trim()}
                    className={`rounded-full px-6 py-3 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-rappi-orange/40 ${
                      noteText.trim()
                        ? "bg-rappi-orange shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-orange-500/30"
                        : "cursor-not-allowed bg-rappi-orange/40"
                    }`}
                  >
                    Enviar mensaje
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="rounded-3xl bg-emerald-50 p-6 text-sm text-emerald-700">
                  <p className="font-semibold">Listo, ya lo compartimos.</p>
                  <p className="mt-1 text-emerald-600/80">Tu shopper recibirá esta nota antes de buscar los sustitutos. Si quieres editarla, vuelve a abrir este modal.</p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-full bg-rappi-orange px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    Listo
                  </button>
                </div>
              </div>
            )}
          </div>
        </ModalShell>
      )}
      {showPreferenceModal && (
        <ModalShell onClose={closeModals} maxWidth="max-w-sm">
          <div className="grid gap-2.5 p-3.5">
            <header className="space-y-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-rappi-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                Sustitutos
              </span>
              <div>
                <h2 className="text-base font-semibold text-rappi-graphite">¿Cómo prefieres tus reemplazos?</h2>
                <p className="text-xs text-rappi-graphite/70">Elige tu mood y lo aplicamos de inmediato.</p>
              </div>
            </header>

            {!preferenceSaved && (
              <fieldset className="space-y-2.5">
                <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-rappi-graphite/50">Opciones</legend>
                {preferenceOptions.map(({ value, label, detail }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition focus-within:outline-none focus-within:ring-2 focus-within:ring-rappi-orange/30 ${
                      preferenceChoice === value
                        ? "border-rappi-orange bg-rappi-orange/10"
                        : "border-rappi-orange/20 bg-white/80 hover:border-rappi-orange/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="swap-preference"
                      value={value}
                      checked={preferenceChoice === value}
                      onChange={(event) => setPreferenceChoice(event.target.value)}
                      className="mt-1 h-4 w-4 accent-rappi-orange"
                    />
                    <div>
                      <p className="font-semibold text-rappi-graphite">{label}</p>
                      <p className="text-sm text-rappi-graphite/70">{detail}</p>
                    </div>
                  </label>
                ))}
              </fieldset>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rappi-graphite/50">Galería de referencia</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {swapImages.map((src, index) => {
                  const isSelected = selectedSwapImage === index;
                  return (
                    <button
                      key={`swap-pref-${index}`}
                      type="button"
                      onClick={() => setSelectedSwapImage(index)}
                      className={`relative overflow-hidden rounded-2xl border-2 transition focus:outline-none focus:ring-2 focus:ring-rappi-orange/40 ${
                        isSelected
                          ? "border-rappi-orange bg-rappi-orange/10"
                          : "border-rappi-orange/20 bg-white/70 hover:border-rappi-orange/40"
                      } ${src ? "" : "cursor-default"}`}
                      aria-pressed={isSelected}
                      disabled={!src}
                    >
                      {src ? (
                        <img
                          src={src}
                          alt={`Opción sugerida ${index + 1}`}
                          className="aspect-[3/4] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center text-[10px] font-semibold uppercase tracking-[0.3em] text-rappi-orange/60">
                          Añade PNG {index + 1}
                        </div>
                      )}
                      {isSelected && (
                        <span className="absolute inset-2 flex items-center justify-center rounded-xl bg-rappi-orange/20 text-xs font-semibold uppercase tracking-[0.3em] text-rappi-orange">
                          ✔
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {swapImageUrls.length < 3 && (
                <p className="mt-1 text-[11px] text-rappi-graphite/60">Carga hasta 3 PNG en <code className="rounded bg-rappi-orange/10 px-2 py-0.5">src/assets/sustitutos</code>.</p>
              )}
            </div>

            {!preferenceSaved && (
              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-full border border-rappi-orange/30 bg-white px-6 py-3 text-sm font-semibold text-rappi-orange transition hover:border-rappi-orange"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmPreference}
                  className="rounded-full bg-rappi-orange px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-rappi-orange/40"
                >
                  Guardar preferencia
                </button>
              </div>
            )}

            {preferenceSaved && (
              <div className="space-y-3">
                <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  <p className="font-semibold">Preferencia actualizada.</p>
                  <p className="mt-1 text-emerald-600/80">A partir de ahora tus sustitutos seguirán esta regla. Puedes cambiarla cuando quieras desde este mismo botón.</p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-full bg-rappi-orange px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    Listo
                  </button>
                </div>
              </div>
            )}
          </div>
        </ModalShell>
      )}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 right-6 z-50 transition ${
          copiedAction ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full bg-rappi-graphite px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20">
          {copiedAction ? `Ruta copiada: ${copiedAction}` : ""}
        </div>
      </div>
    </div>
  );
}

export default App;

