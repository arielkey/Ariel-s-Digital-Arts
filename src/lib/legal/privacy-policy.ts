import type { LegalDocByLocale } from "./types";

const privacyPolicy: LegalDocByLocale = {
  en: {
    title: "Privacy Policy",
    effectiveDateLabel: "Effective date:",
    effectiveDate: "September 28, 2026",
    intro:
      "A Key Solutions Group LLC, doing business as Ariel's Digital Arts, respects your privacy. This policy explains what information we collect on arielsdigitalarts.com, how we use it, and your choices. We do not sell your personal information.",
    sections: [
      {
        heading: "1. Information we collect",
        blocks: [
          {
            type: "ul",
            items: [
              "Order information: name, email, shipping address, and order details when you buy something.",
              "Payment information: processed directly by Stripe or PayPal. We never see or store your full card number.",
              "Email list: your email address (and first name, if you provide it) when you sign up through Kit.",
              "Messages: anything you send us by email.",
              "Technical data: basic, aggregated information such as pages visited and general location, collected through Vercel Analytics. This tool does not use cookies and does not identify you personally.",
            ],
          },
        ],
      },
      {
        heading: "2. How we use it",
        blocks: [
          {
            type: "ul",
            items: [
              "To process, fulfill, and ship your orders.",
              "To send order confirmations, delivery updates, and digital download links.",
              "To send our newsletter, if you signed up.",
              "To answer your questions.",
              "To keep the Site secure and understand how it's used.",
              "To meet legal and tax obligations.",
            ],
          },
        ],
      },
      {
        heading: "3. Who we share it with",
        blocks: [
          { type: "p", text: "We share information only with service providers that help us run the shop:" },
          {
            type: "ul",
            items: [
              "Stripe and PayPal to process payments.",
              "Printful to print and ship print-on-demand orders. Printful receives your name, shipping address, and order details.",
              "Kit to manage our email list.",
              "Shipping carriers, to deliver your order.",
            ],
          },
          {
            type: "p",
            text: "We may also share information if required by law or to protect our rights. Each provider handles your data under its own privacy policy.",
          },
        ],
      },
      {
        heading: "4. Cookies",
        blocks: [
          {
            type: "p",
            text: "The Site and our payment providers use cookies to make checkout work and keep the Site secure. Our analytics tool, Vercel Analytics, does not use cookies. You can block cookies in your browser settings, but checkout may not work properly.",
          },
        ],
      },
      {
        heading: "5. How long we keep it",
        blocks: [
          {
            type: "p",
            text: "We keep order records as long as needed for tax and accounting purposes. We keep your email list information until you unsubscribe.",
          },
        ],
      },
      {
        heading: "6. Your choices and rights",
        blocks: [
          {
            type: "ul",
            items: [
              "Unsubscribe from emails anytime using the link in any email.",
              "Email executiveorganizeak@gmail.com to ask what information we have about you, or to request that we correct or delete it. We'll respond within 30 days.",
              "Depending on where you live (for example, the EU, UK, or certain U.S. states), you may have additional rights under local law. Contact us and we'll honor them as required.",
            ],
          },
        ],
      },
      {
        heading: "7. International visitors",
        blocks: [
          {
            type: "p",
            text: "We are based in the United States. If you visit or order from outside the U.S., your information will be processed in the U.S.",
          },
        ],
      },
      {
        heading: "8. Children",
        blocks: [
          {
            type: "p",
            text: "The Site is not directed to children under 13, and we do not knowingly collect their personal information. If you believe a child has given us information, email us and we will delete it.",
          },
        ],
      },
      {
        heading: "9. Security",
        blocks: [
          {
            type: "p",
            text: "We use reputable providers and reasonable safeguards to protect your information, but no method of transmission or storage is completely secure.",
          },
        ],
      },
      {
        heading: "10. Changes",
        blocks: [
          {
            type: "p",
            text: "We may update this policy. The effective date at the top shows the latest version.",
          },
        ],
      },
      {
        heading: "11. Contact",
        blocks: [{ type: "p", text: "Email executiveorganizeak@gmail.com with any privacy questions." }],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    effectiveDateLabel: "Fecha de entrada en vigor:",
    effectiveDate: "28 de septiembre de 2026",
    intro:
      "A Key Solutions Group LLC, que opera bajo el nombre comercial Ariel's Digital Arts, respeta tu privacidad. Esta política explica qué información recopilamos en arielsdigitalarts.com, cómo la usamos y qué opciones tienes. No vendemos tu información personal.",
    sections: [
      {
        heading: "1. Información que recopilamos",
        blocks: [
          {
            type: "ul",
            items: [
              "Información del pedido: nombre, correo electrónico, dirección de envío y detalles del pedido cuando compras algo.",
              "Información de pago: procesada directamente por Stripe o PayPal. Nunca vemos ni almacenamos el número completo de tu tarjeta.",
              "Lista de correo: tu dirección de correo electrónico (y tu nombre, si lo proporcionas) cuando te suscribes a través de Kit.",
              "Mensajes: cualquier cosa que nos envíes por correo electrónico.",
              "Datos técnicos: información básica y agregada, como las páginas visitadas y la ubicación general, recopilada mediante Vercel Analytics. Esta herramienta no usa cookies ni te identifica personalmente.",
            ],
          },
        ],
      },
      {
        heading: "2. Cómo la usamos",
        blocks: [
          {
            type: "ul",
            items: [
              "Para procesar, preparar y enviar tus pedidos.",
              "Para enviarte confirmaciones de pedido, actualizaciones de entrega y enlaces de descarga digital.",
              "Para enviarte nuestro boletín, si te suscribiste.",
              "Para responder tus preguntas.",
              "Para mantener la seguridad del Sitio y entender cómo se usa.",
              "Para cumplir con obligaciones legales y fiscales.",
            ],
          },
        ],
      },
      {
        heading: "3. Con quién la compartimos",
        blocks: [
          {
            type: "p",
            text: "Compartimos información únicamente con proveedores de servicios que nos ayudan a operar la tienda:",
          },
          {
            type: "ul",
            items: [
              "Stripe y PayPal, para procesar pagos.",
              "Printful, para imprimir y enviar los pedidos bajo demanda. Printful recibe tu nombre, dirección de envío y detalles del pedido.",
              "Kit, para administrar nuestra lista de correo.",
              "Empresas de transporte, para entregar tu pedido.",
            ],
          },
          {
            type: "p",
            text: "También podemos compartir información si así lo exige la ley o para proteger nuestros derechos. Cada proveedor maneja tus datos según su propia política de privacidad.",
          },
        ],
      },
      {
        heading: "4. Cookies",
        blocks: [
          {
            type: "p",
            text: "El Sitio y nuestros proveedores de pago usan cookies para que el pago funcione correctamente y para mantener la seguridad del Sitio. Nuestra herramienta de análisis, Vercel Analytics, no usa cookies. Puedes bloquear las cookies en la configuración de tu navegador, pero el pago podría no funcionar correctamente.",
          },
        ],
      },
      {
        heading: "5. Cuánto tiempo la conservamos",
        blocks: [
          {
            type: "p",
            text: "Conservamos los registros de pedidos durante el tiempo necesario para fines fiscales y contables. Conservamos la información de tu suscripción hasta que te des de baja.",
          },
        ],
      },
      {
        heading: "6. Tus opciones y derechos",
        blocks: [
          {
            type: "ul",
            items: [
              "Darte de baja de los correos en cualquier momento usando el enlace incluido en cualquier correo.",
              "Escribir a executiveorganizeak@gmail.com para preguntar qué información tenemos sobre ti, o para solicitar que la corrijamos o eliminemos. Responderemos dentro de 30 días.",
              "Según el lugar donde vivas (por ejemplo, la UE, el Reino Unido o ciertos estados de EE. UU.), es posible que tengas derechos adicionales según la ley local. Contáctanos y los respetaremos según corresponda.",
            ],
          },
        ],
      },
      {
        heading: "7. Visitantes internacionales",
        blocks: [
          {
            type: "p",
            text: "Estamos ubicados en Estados Unidos. Si nos visitas o realizas un pedido desde fuera de EE. UU., tu información se procesará en Estados Unidos.",
          },
        ],
      },
      {
        heading: "8. Menores de edad",
        blocks: [
          {
            type: "p",
            text: "El Sitio no está dirigido a menores de 13 años, y no recopilamos conscientemente su información personal. Si crees que un menor nos ha proporcionado información, escríbenos y la eliminaremos.",
          },
        ],
      },
      {
        heading: "9. Seguridad",
        blocks: [
          {
            type: "p",
            text: "Usamos proveedores confiables y medidas de seguridad razonables para proteger tu información, pero ningún método de transmisión o almacenamiento es completamente seguro.",
          },
        ],
      },
      {
        heading: "10. Cambios",
        blocks: [
          {
            type: "p",
            text: "Podemos actualizar esta política. La fecha de entrada en vigor en la parte superior muestra la versión más reciente.",
          },
        ],
      },
      {
        heading: "11. Contacto",
        blocks: [
          { type: "p", text: "Escribe a executiveorganizeak@gmail.com con cualquier pregunta sobre privacidad." },
        ],
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    effectiveDateLabel: "تاريخ السريان:",
    effectiveDate: "28 سبتمبر 2026",
    intro:
      "تحترم شركة A Key Solutions Group LLC، العاملة تحت الاسم التجاري Ariel's Digital Arts، خصوصيتك. توضح هذه السياسة المعلومات التي نجمعها على موقع arielsdigitalarts.com، وكيفية استخدامها، وخياراتك المتاحة. نحن لا نبيع معلوماتك الشخصية.",
    sections: [
      {
        heading: "١. المعلومات التي نجمعها",
        blocks: [
          {
            type: "ul",
            items: [
              "معلومات الطلب: الاسم والبريد الإلكتروني وعنوان الشحن وتفاصيل الطلب عند الشراء.",
              "معلومات الدفع: تتم معالجتها مباشرة عبر Stripe أو PayPal. نحن لا نرى ولا نخزّن رقم بطاقتك الكامل أبدًا.",
              "القائمة البريدية: بريدك الإلكتروني (واسمك الأول إن قدّمته) عند الاشتراك عبر Kit.",
              "الرسائل: أي شيء ترسله إلينا عبر البريد الإلكتروني.",
              "البيانات التقنية: معلومات أساسية ومجمَّعة مثل الصفحات التي تمت زيارتها والموقع الجغرافي العام، يتم جمعها عبر Vercel Analytics. لا تستخدم هذه الأداة ملفات تعريف الارتباط (كوكيز) ولا تحدد هويتك الشخصية.",
            ],
          },
        ],
      },
      {
        heading: "٢. كيف نستخدمها",
        blocks: [
          {
            type: "ul",
            items: [
              "لمعالجة طلباتك وتجهيزها وشحنها.",
              "لإرسال تأكيدات الطلب وتحديثات التسليم وروابط التنزيل الرقمي.",
              "لإرسال نشرتنا البريدية، إذا كنت مشتركًا فيها.",
              "للرد على استفساراتك.",
              "للحفاظ على أمان الموقع وفهم كيفية استخدامه.",
              "للوفاء بالالتزامات القانونية والضريبية.",
            ],
          },
        ],
      },
      {
        heading: "٣. مع من نشاركها",
        blocks: [
          { type: "p", text: "نشارك المعلومات فقط مع مزوّدي الخدمات الذين يساعدوننا في تشغيل المتجر:" },
          {
            type: "ul",
            items: [
              "Stripe وPayPal، لمعالجة المدفوعات.",
              "Printful، لطباعة وشحن الطلبات المُنفَّذة عند الطلب. يتلقى Printful اسمك وعنوان الشحن وتفاصيل الطلب.",
              "Kit، لإدارة قائمتنا البريدية.",
              "شركات الشحن، لتسليم طلبك.",
            ],
          },
          {
            type: "p",
            text: "قد نشارك المعلومات أيضًا إذا اقتضى القانون ذلك أو لحماية حقوقنا. تتعامل كل جهة مع بياناتك وفق سياسة الخصوصية الخاصة بها.",
          },
        ],
      },
      {
        heading: "٤. ملفات تعريف الارتباط (الكوكيز)",
        blocks: [
          {
            type: "p",
            text: "يستخدم الموقع ومزوّدو الدفع لدينا ملفات تعريف الارتباط لتشغيل عملية الدفع والحفاظ على أمان الموقع. أداة التحليلات لدينا، Vercel Analytics، لا تستخدم ملفات تعريف الارتباط. يمكنك حظر ملفات تعريف الارتباط من إعدادات متصفحك، لكن عملية الدفع قد لا تعمل بشكل صحيح.",
          },
        ],
      },
      {
        heading: "٥. مدة الاحتفاظ بالبيانات",
        blocks: [
          {
            type: "p",
            text: "نحتفظ بسجلات الطلبات للمدة اللازمة لأغراض المحاسبة والضرائب. نحتفظ بمعلومات اشتراكك البريدي حتى تُلغي الاشتراك.",
          },
        ],
      },
      {
        heading: "٦. خياراتك وحقوقك",
        blocks: [
          {
            type: "ul",
            items: [
              "إلغاء الاشتراك في الرسائل البريدية في أي وقت عبر الرابط الموجود في أي رسالة.",
              "مراسلة executiveorganizeak@gmail.com للسؤال عن المعلومات التي نحتفظ بها عنك، أو لطلب تصحيحها أو حذفها. سنرد خلال 30 يومًا.",
              "بحسب مكان إقامتك (مثل الاتحاد الأوروبي أو المملكة المتحدة أو بعض ولايات الولايات المتحدة)، قد تكون لديك حقوق إضافية بموجب القانون المحلي. تواصل معنا وسنلتزم بها حسب المطلوب.",
            ],
          },
        ],
      },
      {
        heading: "٧. الزوار الدوليون",
        blocks: [
          {
            type: "p",
            text: "مقرنا في الولايات المتحدة. إذا زرت الموقع أو قدّمت طلبًا من خارج الولايات المتحدة، فستتم معالجة معلوماتك داخل الولايات المتحدة.",
          },
        ],
      },
      {
        heading: "٨. الأطفال",
        blocks: [
          {
            type: "p",
            text: "الموقع غير موجه للأطفال دون سن 13 عامًا، ونحن لا نجمع معلوماتهم الشخصية عن علم. إذا كنت تعتقد أن طفلًا قد قدّم لنا معلومات، راسلنا وسنقوم بحذفها.",
          },
        ],
      },
      {
        heading: "٩. الأمان",
        blocks: [
          {
            type: "p",
            text: "نستخدم مزوّدين موثوقين وإجراءات حماية معقولة لحماية معلوماتك، لكن لا توجد طريقة نقل أو تخزين آمنة تمامًا.",
          },
        ],
      },
      {
        heading: "١٠. التعديلات",
        blocks: [
          {
            type: "p",
            text: "يجوز لنا تحديث هذه السياسة. يُظهر تاريخ السريان أعلى الصفحة أحدث نسخة.",
          },
        ],
      },
      {
        heading: "١١. التواصل",
        blocks: [{ type: "p", text: "راسلنا على executiveorganizeak@gmail.com لأي أسئلة تتعلق بالخصوصية." }],
      },
    ],
  },
};

export default privacyPolicy;
