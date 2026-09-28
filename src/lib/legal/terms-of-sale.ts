import type { LegalDocByLocale } from "./types";

const termsOfSale: LegalDocByLocale = {
  en: {
    title: "Terms of Sale & Refund Policy",
    effectiveDateLabel: "Effective date:",
    effectiveDate: "September 28, 2026",
    intro:
      "These Terms of Sale apply to every purchase from arielsdigitalarts.com, operated by A Key Solutions Group LLC, doing business as Ariel's Digital Arts. By placing an order, you agree to them.",
    sections: [
      {
        heading: "1. Orders and payment",
        blocks: [
          {
            type: "p",
            text: "Prices are shown in U.S. dollars. We accept payment through Stripe and PayPal. Applicable sales tax is calculated at checkout. We may cancel and refund any order in case of a pricing error, suspected fraud, or an item that is no longer available.",
          },
        ],
      },
      {
        heading: "2. Digital downloads: all sales final",
        blocks: [
          {
            type: "p",
            text: "Because digital files can't be returned, all digital purchases are final and non-refundable. If a file is corrupted, won't open, or isn't what the listing described, email us within 14 days of purchase and we'll send a working replacement.",
          },
        ],
      },
      {
        heading: "3. Personal-use license for digital products",
        blocks: [
          {
            type: "p",
            text: "When you buy a digital product, you receive a limited, non-exclusive, non-transferable license for personal use only. You may:",
          },
          { type: "ul", items: ["Download the files and print them for yourself, your family, or your own household or classroom use."] },
          { type: "p", text: "You may not:" },
          {
            type: "ul",
            items: [
              "Resell, share, give away, or distribute the files, printed or digital.",
              "Use the files in any product for sale, including print-on-demand.",
              "Upload the files to any AI tool, or use them to train or develop AI.",
              "Claim the artwork as your own.",
            ],
          },
          {
            type: "p",
            text: "Commercial use is available only by written agreement. Email executiveorganizeak@gmail.com to ask. We keep all copyright in the artwork; you are buying a license, not ownership.",
          },
        ],
      },
      {
        heading: "4. Print-on-demand items (apparel, puzzles, and similar)",
        blocks: [
          {
            type: "p",
            text: "These items are made to order by our partner Printful, so we can't accept returns or exchanges for change of mind, wrong size, or wrong color choice. Please check size charts before ordering.",
          },
          {
            type: "p",
            text: "We will replace or refund an item that arrives misprinted, damaged, or defective. Email executiveorganizeak@gmail.com within 30 days of delivery with your order number and a clear photo of the problem.",
          },
          {
            type: "p",
            text: "Orders shipped to an incorrect address entered at checkout are the customer's responsibility.",
          },
        ],
      },
      {
        heading: "5. Original artwork and prints: 30-day returns",
        blocks: [
          { type: "p", text: "You may return original artwork and prints within 30 days of delivery for a refund, if the item is:" },
          {
            type: "ul",
            items: [
              "Unused, undamaged, and in its original packaging.",
              "Accompanied by any certificate of authenticity that came with it.",
            ],
          },
          {
            type: "p",
            text: "To start a return, email executiveorganizeak@gmail.com with your order number before sending anything back. You pay return shipping unless the item arrived damaged or we sent the wrong item. We recommend a tracked, insured shipping method; we can't refund items lost on the way back to us.",
          },
          {
            type: "p",
            text: "We'll refund your original payment method within 10 business days of receiving and inspecting the return. Original shipping charges are not refunded unless we made an error.",
          },
        ],
      },
      {
        heading: "6. Damaged or wrong items",
        blocks: [
          {
            type: "p",
            text: "If any physical item arrives damaged or wrong, email us within 30 days of delivery with photos. We'll make it right with a replacement or refund, at no cost to you.",
          },
        ],
      },
      {
        heading: "7. AI disclosure",
        blocks: [
          {
            type: "p",
            text: "Our artwork is created by hand unless a product listing clearly states otherwise. Any AI-assisted product will be labeled on its product page.",
          },
        ],
      },
      {
        heading: "8. Colors and appearance",
        blocks: [
          {
            type: "p",
            text: "Colors may look different on your screen than in person, and handmade originals may have natural variations. These differences are not defects.",
          },
        ],
      },
      {
        heading: "9. Chargebacks",
        blocks: [
          {
            type: "p",
            text: "Please contact us before filing a chargeback or payment dispute so we can resolve the issue directly.",
          },
        ],
      },
      {
        heading: "10. Contact",
        blocks: [{ type: "p", text: "Email executiveorganizeak@gmail.com with questions about any order." }],
      },
    ],
  },
  es: {
    title: "Términos de Venta y Política de Reembolsos",
    effectiveDateLabel: "Fecha de entrada en vigor:",
    effectiveDate: "28 de septiembre de 2026",
    intro:
      "Estos Términos de Venta aplican a toda compra realizada en arielsdigitalarts.com, operado por A Key Solutions Group LLC, que opera bajo el nombre comercial Ariel's Digital Arts. Al realizar un pedido, los aceptas.",
    sections: [
      {
        heading: "1. Pedidos y pago",
        blocks: [
          {
            type: "p",
            text: "Los precios se muestran en dólares estadounidenses. Aceptamos pagos a través de Stripe y PayPal. El impuesto sobre ventas correspondiente se calcula al finalizar la compra. Podemos cancelar y reembolsar cualquier pedido en caso de un error de precio, sospecha de fraude, o si el artículo ya no está disponible.",
          },
        ],
      },
      {
        heading: "2. Descargas digitales: todas las ventas son finales",
        blocks: [
          {
            type: "p",
            text: "Debido a que los archivos digitales no se pueden devolver, todas las compras digitales son finales y no reembolsables. Si un archivo está dañado, no se abre, o no corresponde a lo descrito en la publicación, escríbenos dentro de los 14 días posteriores a la compra y te enviaremos un reemplazo funcional.",
          },
        ],
      },
      {
        heading: "3. Licencia de uso personal para productos digitales",
        blocks: [
          {
            type: "p",
            text: "Al comprar un producto digital, recibes una licencia limitada, no exclusiva e intransferible, únicamente para uso personal. Puedes:",
          },
          { type: "ul", items: ["Descargar los archivos e imprimirlos para ti, tu familia, o el uso en tu propio hogar o salón de clases."] },
          { type: "p", text: "No puedes:" },
          {
            type: "ul",
            items: [
              "Revender, compartir, regalar o distribuir los archivos, impresos o digitales.",
              "Usar los archivos en ningún producto destinado a la venta, incluidos los productos bajo demanda.",
              "Subir los archivos a ninguna herramienta de IA, ni usarlos para entrenar o desarrollar IA.",
              "Atribuirte la autoría de la obra.",
            ],
          },
          {
            type: "p",
            text: "El uso comercial solo está disponible mediante acuerdo por escrito. Escribe a executiveorganizeak@gmail.com para consultarlo. Conservamos todos los derechos de autor sobre la obra; estás comprando una licencia, no la propiedad de la obra.",
          },
        ],
      },
      {
        heading: "4. Artículos bajo demanda (ropa, rompecabezas y similares)",
        blocks: [
          {
            type: "p",
            text: "Estos artículos son fabricados sobre pedido por nuestro socio Printful, por lo que no podemos aceptar devoluciones ni cambios por arrepentimiento de compra, talla incorrecta o elección de color equivocada. Por favor revisa las tablas de tallas antes de ordenar.",
          },
          {
            type: "p",
            text: "Reemplazaremos o reembolsaremos cualquier artículo que llegue mal impreso, dañado o defectuoso. Escribe a executiveorganizeak@gmail.com dentro de los 30 días posteriores a la entrega, con tu número de pedido y una foto clara del problema.",
          },
          {
            type: "p",
            text: "Los pedidos enviados a una dirección incorrecta ingresada al momento de la compra son responsabilidad del cliente.",
          },
        ],
      },
      {
        heading: "5. Obras de arte originales e impresiones: devoluciones en 30 días",
        blocks: [
          {
            type: "p",
            text: "Puedes devolver obras de arte originales e impresiones dentro de los 30 días posteriores a la entrega para obtener un reembolso, siempre que el artículo esté:",
          },
          {
            type: "ul",
            items: [
              "Sin usar, sin daños, y en su empaque original.",
              "Acompañado de cualquier certificado de autenticidad que haya venido con él.",
            ],
          },
          {
            type: "p",
            text: "Para iniciar una devolución, escribe a executiveorganizeak@gmail.com con tu número de pedido antes de enviar nada de vuelta. Tú pagas el envío de devolución, salvo que el artículo haya llegado dañado o te hayamos enviado el artículo equivocado. Recomendamos un método de envío con seguimiento y seguro; no podemos reembolsar artículos perdidos en el camino de regreso hacia nosotros.",
          },
          {
            type: "p",
            text: "Reembolsaremos tu método de pago original dentro de los 10 días hábiles posteriores a recibir e inspeccionar la devolución. Los cargos de envío originales no se reembolsan, salvo que el error haya sido nuestro.",
          },
        ],
      },
      {
        heading: "6. Artículos dañados o incorrectos",
        blocks: [
          {
            type: "p",
            text: "Si algún artículo físico llega dañado o incorrecto, escríbenos dentro de los 30 días posteriores a la entrega con fotos. Lo solucionaremos con un reemplazo o reembolso, sin costo alguno para ti.",
          },
        ],
      },
      {
        heading: "7. Divulgación sobre el uso de IA",
        blocks: [
          {
            type: "p",
            text: "Nuestras obras se crean a mano, salvo que la publicación del producto indique claramente lo contrario. Cualquier producto asistido por IA se indicará en su página de producto.",
          },
        ],
      },
      {
        heading: "8. Colores y apariencia",
        blocks: [
          {
            type: "p",
            text: "Los colores pueden verse diferentes en tu pantalla que en persona, y las obras originales hechas a mano pueden tener variaciones naturales. Estas diferencias no son defectos.",
          },
        ],
      },
      {
        heading: "9. Contracargos",
        blocks: [
          {
            type: "p",
            text: "Por favor contáctanos antes de presentar un contracargo o disputa de pago, para que podamos resolver el problema directamente.",
          },
        ],
      },
      {
        heading: "10. Contacto",
        blocks: [
          { type: "p", text: "Escribe a executiveorganizeak@gmail.com con preguntas sobre cualquier pedido." },
        ],
      },
    ],
  },
  ar: {
    title: "شروط البيع وسياسة الاسترجاع",
    effectiveDateLabel: "تاريخ السريان:",
    effectiveDate: "28 سبتمبر 2026",
    intro:
      "تنطبق شروط البيع هذه على كل عملية شراء من موقع arielsdigitalarts.com، الذي تديره شركة A Key Solutions Group LLC، العاملة تحت الاسم التجاري Ariel's Digital Arts. بإتمام الطلب، فإنك توافق عليها.",
    sections: [
      {
        heading: "١. الطلبات والدفع",
        blocks: [
          {
            type: "p",
            text: "تُعرض الأسعار بالدولار الأمريكي. نقبل الدفع عبر Stripe وPayPal. يتم احتساب ضريبة المبيعات المطبَّقة عند إتمام الطلب. يجوز لنا إلغاء أي طلب واسترداد قيمته في حال وجود خطأ في التسعير، أو الاشتباه في احتيال، أو عدم توفر المنتج.",
          },
        ],
      },
      {
        heading: "٢. الملفات الرقمية: جميع المبيعات نهائية",
        blocks: [
          {
            type: "p",
            text: "نظرًا لعدم إمكانية إرجاع الملفات الرقمية، فإن جميع المشتريات الرقمية نهائية وغير قابلة للاسترداد. إذا كان الملف تالفًا أو لا يفتح أو لا يطابق ما ورد في وصف المنتج، راسلنا خلال 14 يومًا من الشراء وسنرسل لك نسخة بديلة صالحة للعمل.",
          },
        ],
      },
      {
        heading: "٣. ترخيص الاستخدام الشخصي للمنتجات الرقمية",
        blocks: [
          {
            type: "p",
            text: "عند شراء منتج رقمي، تحصل على ترخيص محدود وغير حصري وغير قابل للتحويل للاستخدام الشخصي فقط. يجوز لك:",
          },
          { type: "ul", items: ["تنزيل الملفات وطباعتها لنفسك أو لعائلتك أو للاستخدام داخل منزلك أو صفك الدراسي."] },
          { type: "p", text: "لا يجوز لك:" },
          {
            type: "ul",
            items: [
              "إعادة بيع الملفات أو مشاركتها أو إهداؤها أو توزيعها، سواء مطبوعة أو رقمية.",
              "استخدام الملفات في أي منتج معروض للبيع، بما في ذلك المنتجات المُنفَّذة عند الطلب.",
              "رفع الملفات إلى أي أداة ذكاء اصطناعي، أو استخدامها لتدريب أو تطوير الذكاء الاصطناعي.",
              "ادّعاء ملكية العمل الفني لنفسك.",
            ],
          },
          {
            type: "p",
            text: "الاستخدام التجاري متاح فقط بموجب اتفاق كتابي. راسل executiveorganizeak@gmail.com للاستفسار. نحتفظ بجميع حقوق النشر الخاصة بالعمل الفني؛ فأنت تشتري ترخيصًا، لا ملكية العمل.",
          },
        ],
      },
      {
        heading: "٤. المنتجات المُنفَّذة عند الطلب (الملابس والألغاز وما شابهها)",
        blocks: [
          {
            type: "p",
            text: "تُصنع هذه المنتجات حسب الطلب من قِبل شريكنا Printful، لذا لا يمكننا قبول إرجاعها أو استبدالها بسبب تغيير الرأي أو اختيار مقاس خاطئ أو لون غير مناسب. يُرجى مراجعة جداول المقاسات قبل الطلب.",
          },
          {
            type: "p",
            text: "سنقوم باستبدال أو استرداد قيمة أي منتج يصل بطباعة خاطئة أو تالفًا أو معيبًا. راسل executiveorganizeak@gmail.com خلال 30 يومًا من التسليم مع رقم طلبك وصورة واضحة للمشكلة.",
          },
          {
            type: "p",
            text: "الطلبات المُرسلة إلى عنوان غير صحيح تم إدخاله عند الشراء هي مسؤولية العميل.",
          },
        ],
      },
      {
        heading: "٥. الأعمال الفنية الأصلية والمطبوعات: إمكانية الإرجاع خلال 30 يومًا",
        blocks: [
          {
            type: "p",
            text: "يمكنك إرجاع الأعمال الفنية الأصلية والمطبوعات خلال 30 يومًا من التسليم لاسترداد قيمتها، بشرط أن يكون المنتج:",
          },
          {
            type: "ul",
            items: [
              "غير مستخدم وغير تالف وفي عبوته الأصلية.",
              "مرفقًا بأي شهادة أصالة كانت مرفقة به عند التسليم.",
            ],
          },
          {
            type: "p",
            text: "لبدء عملية الإرجاع، راسل executiveorganizeak@gmail.com برقم طلبك قبل إرسال أي شيء إلينا. تتحمل أنت تكلفة شحن الإرجاع ما لم يصل المنتج تالفًا أو أرسلنا لك المنتج الخاطئ. ننصح باستخدام وسيلة شحن مع تتبع وتأمين؛ فنحن لا نستطيع استرداد قيمة المنتجات المفقودة في طريق عودتها إلينا.",
          },
          {
            type: "p",
            text: "سنُعيد المبلغ إلى وسيلة الدفع الأصلية خلال 10 أيام عمل من استلام المرتجع وفحصه. لا تُسترد رسوم الشحن الأصلية إلا إذا كان الخطأ من جانبنا.",
          },
        ],
      },
      {
        heading: "٦. المنتجات التالفة أو الخاطئة",
        blocks: [
          {
            type: "p",
            text: "إذا وصل أي منتج مادي تالفًا أو خاطئًا، راسلنا خلال 30 يومًا من التسليم مع إرفاق صور. سنقوم بتصحيح الأمر عبر استبدال المنتج أو استرداد قيمته، دون أي تكلفة عليك.",
          },
        ],
      },
      {
        heading: "٧. الإفصاح عن استخدام الذكاء الاصطناعي",
        blocks: [
          {
            type: "p",
            text: "أعمالنا الفنية مرسومة يدويًا ما لم يُذكر خلاف ذلك بوضوح في صفحة المنتج. أي منتج بمساعدة الذكاء الاصطناعي سيُشار إليه في صفحته الخاصة.",
          },
        ],
      },
      {
        heading: "٨. الألوان والمظهر",
        blocks: [
          {
            type: "p",
            text: "قد تظهر الألوان بشكل مختلف على شاشتك عمّا هي عليه في الواقع، وقد تحتوي الأعمال الأصلية المصنوعة يدويًا على اختلافات طبيعية. هذه الاختلافات لا تُعد عيوبًا.",
          },
        ],
      },
      {
        heading: "٩. طلبات استرداد المبالغ عبر البنك (Chargebacks)",
        blocks: [
          {
            type: "p",
            text: "يُرجى التواصل معنا قبل تقديم طلب استرداد عبر البنك أو نزاع دفع، حتى نتمكن من حل المشكلة مباشرة معك.",
          },
        ],
      },
      {
        heading: "١٠. التواصل",
        blocks: [{ type: "p", text: "راسلنا على executiveorganizeak@gmail.com لأي استفسار عن طلبك." }],
      },
    ],
  },
};

export default termsOfSale;
