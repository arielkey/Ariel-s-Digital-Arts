import type { LegalDocByLocale } from "./types";

const shippingPolicy: LegalDocByLocale = {
  en: {
    title: "Shipping Policy",
    effectiveDateLabel: "Effective date:",
    effectiveDate: "September 28, 2026",
    intro:
      "We ship to the United States and internationally. Shipping costs and estimated delivery times are shown at checkout before you pay.",
    sections: [
      {
        heading: "1. Who ships your order",
        blocks: [
          {
            type: "ul",
            items: [
              "Print-on-demand items (apparel, puzzles, and similar) are printed and shipped by our fulfillment partner, Printful. Each item is made to order, so production typically takes a few business days before shipping. Items in one order may arrive in separate packages.",
              "Original artwork and prints are packed and shipped by us from Colorado within 7 business days.",
              "Digital downloads are delivered by email and on the order confirmation page right after payment. Nothing is shipped.",
            ],
          },
        ],
      },
      {
        heading: "2. Tracking",
        blocks: [{ type: "p", text: "You'll receive an email with tracking information when your order ships." }],
      },
      {
        heading: "3. International orders",
        blocks: [
          {
            type: "p",
            text: "International customers are responsible for any customs duties, import taxes, or brokerage fees charged by their country. These are not included in our prices or shipping costs, and we can't predict them. Refused packages are not eligible for a refund of shipping costs or duties.",
          },
        ],
      },
      {
        heading: "4. Address accuracy",
        blocks: [
          {
            type: "p",
            text: "Please double-check your shipping address at checkout. We are not responsible for orders sent to an incorrect address you provided. If you notice a mistake, email us right away; we'll fix it if the order hasn't shipped.",
          },
        ],
      },
      {
        heading: "5. Lost, stolen, or delayed packages",
        blocks: [
          {
            type: "p",
            text: "If tracking shows your package as delivered but you can't find it, please check with neighbors and your local carrier first. If a package is lost in transit, email us and we'll work with the carrier and Printful to resolve it. We aren't responsible for delays caused by carriers, customs, weather, or other events outside our control.",
          },
        ],
      },
      {
        heading: "6. Damaged in shipping",
        blocks: [
          {
            type: "p",
            text: "If your item arrives damaged, email executiveorganizeak@gmail.com within 30 days of delivery with your order number and photos of the item and packaging. See our Terms of Sale & Refund Policy for how we make it right.",
          },
        ],
      },
      {
        heading: "7. Contact",
        blocks: [{ type: "p", text: "Email executiveorganizeak@gmail.com with any shipping questions." }],
      },
    ],
  },
  es: {
    title: "Política de Envíos",
    effectiveDateLabel: "Fecha de entrada en vigor:",
    effectiveDate: "28 de septiembre de 2026",
    intro:
      "Enviamos a Estados Unidos e internacionalmente. Los costos de envío y los tiempos estimados de entrega se muestran al finalizar la compra, antes de pagar.",
    sections: [
      {
        heading: "1. Quién envía tu pedido",
        blocks: [
          {
            type: "ul",
            items: [
              "Los artículos bajo demanda (ropa, rompecabezas y similares) son impresos y enviados por nuestro socio de producción, Printful. Cada artículo se fabrica sobre pedido, por lo que la producción suele tardar unos días hábiles antes del envío. Los artículos de un mismo pedido pueden llegar en paquetes separados.",
              "Las obras de arte originales y las impresiones son empacadas y enviadas por nosotros desde Colorado dentro de un plazo de 7 días hábiles.",
              "Las descargas digitales se entregan por correo electrónico y en la página de confirmación del pedido inmediatamente después del pago. No se envía nada físicamente.",
            ],
          },
        ],
      },
      {
        heading: "2. Seguimiento",
        blocks: [
          { type: "p", text: "Recibirás un correo electrónico con la información de seguimiento cuando tu pedido sea enviado." },
        ],
      },
      {
        heading: "3. Pedidos internacionales",
        blocks: [
          {
            type: "p",
            text: "Los clientes internacionales son responsables de cualquier arancel aduanero, impuesto de importación o comisión de intermediación que cobre su país. Estos no están incluidos en nuestros precios ni en los costos de envío, y no podemos predecirlos. Los paquetes rechazados no son elegibles para el reembolso de los costos de envío ni de los aranceles.",
          },
        ],
      },
      {
        heading: "4. Exactitud de la dirección",
        blocks: [
          {
            type: "p",
            text: "Por favor verifica bien tu dirección de envío al finalizar la compra. No somos responsables de pedidos enviados a una dirección incorrecta que hayas proporcionado. Si notas un error, escríbenos de inmediato; lo corregiremos si el pedido aún no ha sido enviado.",
          },
        ],
      },
      {
        heading: "5. Paquetes perdidos, robados o retrasados",
        blocks: [
          {
            type: "p",
            text: "Si el seguimiento muestra tu paquete como entregado pero no lo encuentras, por favor consulta primero con tus vecinos y con la empresa de transporte local. Si un paquete se pierde durante el envío, escríbenos y trabajaremos junto con la empresa de transporte y Printful para resolverlo. No somos responsables de retrasos causados por transportistas, aduanas, clima u otros eventos fuera de nuestro control.",
          },
        ],
      },
      {
        heading: "6. Daños durante el envío",
        blocks: [
          {
            type: "p",
            text: "Si tu artículo llega dañado, escribe a executiveorganizeak@gmail.com dentro de los 30 días posteriores a la entrega, con tu número de pedido y fotos del artículo y del empaque. Consulta nuestros Términos de Venta y Política de Reembolsos para saber cómo lo solucionamos.",
          },
        ],
      },
      {
        heading: "7. Contacto",
        blocks: [
          { type: "p", text: "Escribe a executiveorganizeak@gmail.com con cualquier pregunta sobre el envío." },
        ],
      },
    ],
  },
  ar: {
    title: "سياسة الشحن",
    effectiveDateLabel: "تاريخ السريان:",
    effectiveDate: "28 سبتمبر 2026",
    intro:
      "نقوم بالشحن داخل الولايات المتحدة وإلى خارجها. تظهر تكاليف الشحن والمواعيد التقديرية للتسليم عند إتمام الطلب، قبل الدفع.",
    sections: [
      {
        heading: "١. من يقوم بشحن طلبك",
        blocks: [
          {
            type: "ul",
            items: [
              "المنتجات المُنفَّذة عند الطلب (الملابس والألغاز وما شابهها) تُطبع وتُشحن بواسطة شريكنا Printful. يُصنع كل منتج حسب الطلب، لذا يستغرق الإنتاج عادةً بضعة أيام عمل قبل الشحن. قد تصل منتجات الطلب الواحد في طرود منفصلة.",
              "تُعبَّأ الأعمال الفنية الأصلية والمطبوعات وتُشحن من قِبلنا من ولاية كولورادو خلال 7 أيام عمل.",
              "تُسلَّم الملفات الرقمية عبر البريد الإلكتروني وعلى صفحة تأكيد الطلب مباشرة بعد الدفع. لا يتم شحن أي شيء ماديًا.",
            ],
          },
        ],
      },
      {
        heading: "٢. تتبع الشحنة",
        blocks: [{ type: "p", text: "ستتلقى رسالة بريد إلكتروني تحتوي على معلومات التتبع عند شحن طلبك." }],
      },
      {
        heading: "٣. الطلبات الدولية",
        blocks: [
          {
            type: "p",
            text: "يتحمل العملاء الدوليون مسؤولية أي رسوم جمركية أو ضرائب استيراد أو رسوم تخليص تفرضها بلدانهم. هذه الرسوم غير مشمولة في أسعارنا أو تكاليف الشحن، ولا يمكننا توقعها. الطرود المرفوضة لا تستحق استرداد تكاليف الشحن أو الرسوم الجمركية.",
          },
        ],
      },
      {
        heading: "٤. دقة العنوان",
        blocks: [
          {
            type: "p",
            text: "يُرجى التحقق جيدًا من عنوان الشحن عند إتمام الطلب. نحن غير مسؤولين عن الطلبات المُرسلة إلى عنوان غير صحيح قدّمته. إذا لاحظت خطأً، راسلنا فورًا؛ وسنقوم بتصحيحه إذا لم يكن الطلب قد شُحن بعد.",
          },
        ],
      },
      {
        heading: "٥. الطرود المفقودة أو المسروقة أو المتأخرة",
        blocks: [
          {
            type: "p",
            text: "إذا أظهر التتبع أن طردك تم تسليمه لكنك لم تجده، يُرجى أولًا التحقق مع الجيران وشركة الشحن المحلية. إذا فُقد الطرد أثناء الشحن، راسلنا وسنعمل مع شركة الشحن وPrintful لحل المشكلة. نحن غير مسؤولين عن التأخيرات الناتجة عن شركات الشحن أو الجمارك أو الطقس أو أي ظروف أخرى خارجة عن إرادتنا.",
          },
        ],
      },
      {
        heading: "٦. التلف أثناء الشحن",
        blocks: [
          {
            type: "p",
            text: "إذا وصل منتجك تالفًا، راسل executiveorganizeak@gmail.com خلال 30 يومًا من التسليم مع رقم طلبك وصور للمنتج والتغليف. راجع شروط البيع وسياسة الاسترجاع الخاصة بنا لمعرفة كيفية تصحيح الأمر.",
          },
        ],
      },
      {
        heading: "٧. التواصل",
        blocks: [{ type: "p", text: "راسلنا على executiveorganizeak@gmail.com لأي استفسار عن الشحن." }],
      },
    ],
  },
};

export default shippingPolicy;
