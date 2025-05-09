import React from "react";
import Index from "../Index";

const englishText = (t, navigate) => {
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>{t("Terms & Conditions")}</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>Effective Date:</b> 08/04/2025
          </p>

          <p>
            Welcome to <b>Pocket Pi</b> – a non-custodial, Pi Network-integrated
            platform designed to provide secure and seamless Pi transactions for
            individuals and businesses. By accessing or using the Pocket Pi app,
            you agree to be bound by the following Terms of Service.
          </p>
          <hr />

          <h5>1. Acceptance of Terms</h5>

          <p>By using Pocket Pi, you confirm that you:</p>

          <p>● Are a verified Pi Network user.</p>

          <p>
            ● Agree to comply with these Terms of Service and any applicable
            laws or regulations.
          </p>

          <p>
            ● Understand that Pocket Pi is built for use exclusively within the{" "}
            <b>Pi Network Testnet/Mainnet</b>, and your activity will remain
            within its ecosystem.
          </p>
          <hr />
          <h5>2. Platform Overview</h5>

          <p>Pocket Pi provides the following services:</p>

          <p>● Peer-to-peer Pi transactions between users of Pocket Pi.</p>

          <p>● Wallet-to-wallet transfers with Pocket Pi’s internal wallets.</p>

          <p>
            ● Controlled transfer to/from the official Pi Network wallet
            (non-custodial).
          </p>

          <p>
            ● Business tools including employee payout, address book management,
            and sales analytics.
          </p>
          <hr />
          <h5>3. User Responsibilities</h5>

          <p>You agree to:</p>

          <p>
            ● Maintain the security and confidentiality of your wallet address
            and credentials.
          </p>

          <p>● Use the platform only for lawful purposes.</p>

          <p>
            ● Not attempt to reverse engineer, modify, or interfere with the
            platform or its integrations with Pi Network APIs.
          </p>

          <p>
            You are solely responsible for any transactions initiated through
            your account.
          </p>
          <hr />
          <h5>4. Fees and Subscriptions</h5>

          <p>
            ● Basic transactions within Pocket Pi wallets are free up to a daily
            limit.
          </p>

          <p>● A nominal fee applies beyond that limit.</p>

          <p>● Transfers to/from Pi Network wallets carry a flat fee.</p>

          <p>● Annual subscription fee, which may decrease as usage grows.</p>

          <p>
            All fees are clearly displayed and subject to change with prior
            notice.
          </p>
          <hr />
          <h5>5. Data Usage</h5>

          <p>
            Pocket Pi collects limited personal and transaction data, strictly
            as outlined in our Privacy Policy. We <b>do not access or store </b>
            private keys, and all interactions occur through{" "}
            <b>secure Pi Network APIs</b>.
          </p>
          <hr />
          <h5>6. Account Termination</h5>

          <p>We reserve the right to suspend or terminate user access if:</p>

          <p>● The user violates these Terms.</p>

          <p>● Fraudulent, abusive, or illegal activity is detected.</p>

          <p>● There is a breach of Pi Network rules or ecosystem policies.</p>

          <hr />

          <h5>7. Limitation of Liability</h5>

          <p>
            Pocket Pi is provided on an “as-is” and “as-available” basis. While
            we strive for reliability and uptime, we are <b>not liable</b> for:
          </p>

          <p>● Loss of Pi due to incorrect transactions.</p>

          <p>● Downtime or changes in the Pi Network environment.</p>

          <p>● Unauthorized access due to user negligence.</p>

          <p>
            Users are advised to{" "}
            <b>verify addresses and transaction details carefully</b> before
            confirming.
          </p>

          <hr />

          <h5>8. Modifications</h5>

          <p>
            We may revise these Terms at any time. Updated terms will be posted
            within the app and on our official channels. Continued use of the
            platform after updates constitutes acceptance.
          </p>

          <hr />

          <h5>9. Governing Law</h5>

          <p>
            These Terms are governed by the principles of the Pi Network
            ecosystem and applicable digital asset regulations where applicable.
          </p>

          <hr />
        </div>
      </div>
    </div>
  );
};
const hindiText = (t, navigate) => {
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>नियम और शर्तें</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>प्रभावी तिथि:</b> 08/04/2025
          </p>

          <p>
            स्वागत है <b>Pocket Pi</b> में – यह एक गैर-कस्टोडियल, Pi
            नेटवर्क-एकीकृत प्लेटफ़ॉर्म है जो व्यक्तिगत और व्यावसायिक
            उपयोगकर्ताओं के लिए सुरक्षित और सहज लेन-देन प्रदान करता है। ऐप का
            उपयोग करके, आप नीचे दिए गए नियमों से सहमत होते हैं।
          </p>
          <hr />

          <h5>1. नियमों की स्वीकृति</h5>
          <p>Pocket Pi का उपयोग करके आप पुष्टि करते हैं कि आप:</p>
          <p>● एक सत्यापित Pi नेटवर्क उपयोगकर्ता हैं।</p>
          <p>● इन नियमों और लागू कानूनों का पालन करेंगे।</p>
          <p>
            ● जानते हैं कि यह केवल <b>Pi नेटवर्क टेस्टनेट/मेननेट</b> के भीतर
            उपयोग के लिए है।
          </p>
          <hr />

          <h5>2. प्लेटफ़ॉर्म अवलोकन</h5>
          <p>Pocket Pi निम्न सेवाएं प्रदान करता है:</p>
          <p>● Pocket Pi उपयोगकर्ताओं के बीच पीयर-टू-पीयर लेन-देन।</p>
          <p>● आंतरिक वॉलेट के बीच ट्रांसफर।</p>
          <p>● सरकारी Pi वॉलेट के साथ सीमित ट्रांसफर।</p>
          <p>
            ● व्यवसायिक टूल जैसे कर्मचारी भुगतान, पता पुस्तिका प्रबंधन, और
            बिक्री विश्लेषण।
          </p>
          <hr />

          <h5>3. उपयोगकर्ता जिम्मेदारियाँ</h5>
          <p>आप सहमत हैं कि आप:</p>
          <p>● अपने वॉलेट पते और क्रेडेंशियल की सुरक्षा बनाए रखेंगे।</p>
          <p>● प्लेटफ़ॉर्म का उपयोग केवल वैध उद्देश्यों के लिए करेंगे।</p>
          <p>
            ● प्लेटफ़ॉर्म या इसके Pi नेटवर्क API एकीकरण से छेड़छाड़ नहीं करेंगे।
          </p>
          <p>
            आप अपने खाते के माध्यम से की गई लेन-देन के लिए पूरी तरह जिम्मेदार
            हैं।
          </p>
          <hr />

          <h5>4. शुल्क और सदस्यता</h5>
          <p>● Pocket Pi वॉलेट में सीमित मुफ्त लेन-देन।</p>
          <p>● उस सीमा से ऊपर मामूली शुल्क।</p>
          <p>● Pi नेटवर्क वॉलेट ट्रांसफर पर एक निर्धारित शुल्क।</p>
          <p>● वार्षिक सदस्यता शुल्क जो उपयोग बढ़ने पर घट सकता है।</p>
          <p>सभी शुल्क पहले से बताए जाएंगे और बदलाव की सूचना दी जाएगी।</p>
          <hr />

          <h5>5. डेटा उपयोग</h5>
          <p>
            Pocket Pi सीमित व्यक्तिगत और लेन-देन डेटा एकत्र करता है, जैसा कि
            हमारी गोपनीयता नीति में वर्णित है। हम{" "}
            <b>कभी भी निजी कुंजी तक पहुंच नहीं</b> रखते हैं और सभी इंटरैक्शन{" "}
            <b>सुरक्षित Pi नेटवर्क API</b> के माध्यम से होते हैं।
          </p>
          <hr />

          <h5>6. खाता समाप्ति</h5>
          <p>हम उपयोगकर्ता की पहुंच को निलंबित या समाप्त कर सकते हैं यदि:</p>
          <p>● उपयोगकर्ता इन शर्तों का उल्लंघन करता है।</p>
          <p>● धोखाधड़ी, दुर्व्यवहार या अवैध गतिविधि पाई जाती है।</p>
          <p>● Pi नेटवर्क नीतियों का उल्लंघन होता है।</p>
          <hr />

          <h5>7. जिम्मेदारी की सीमा</h5>
          <p>
            Pocket Pi "जैसा है" और "उपलब्ध होने पर" आधार पर प्रदान किया जाता है।
            हम जिम्मेदार नहीं हैं:
          </p>
          <p>● गलत लेन-देन के कारण Pi की हानि।</p>
          <p>● Pi नेटवर्क में बदलाव या डाउनटाइम।</p>
          <p>● उपयोगकर्ता की लापरवाही के कारण अनधिकृत एक्सेस।</p>
          <p>
            कृपया <b>सभी विवरण ध्यानपूर्वक जांचें</b>।
          </p>
          <hr />

          <h5>8. संशोधन</h5>
          <p>
            हम समय-समय पर इन नियमों को अपडेट कर सकते हैं। अपडेट ऐप में और हमारी
            आधिकारिक चैनलों पर पोस्ट किए जाएंगे।
          </p>
          <hr />

          <h5>9. कानून</h5>
          <p>
            ये शर्तें Pi नेटवर्क इकोसिस्टम और डिजिटल एसेट नियमों द्वारा शासित
            हैं।
          </p>
        </div>
      </div>
    </div>
  );
};
const arabicText = (t, navigate) => {
  return (
    <div className="app-container settings-page" dir="rtl">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>الشروط والأحكام</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>تاريخ السريان:</b> 08/04/2025
          </p>

          <p>
            مرحبًا بك في <b>Pocket Pi</b> – منصة غير وصائية مدمجة مع شبكة Pi
            لتوفير معاملات آمنة وسلسة للمستخدمين الأفراد والشركات. باستخدام
            التطبيق، فإنك توافق على الشروط التالية.
          </p>
          <hr />

          <h5>1. قبول الشروط</h5>
          <p>باستخدام Pocket Pi، فإنك تؤكد أنك:</p>
          <p>● مستخدم مُوثق في شبكة Pi.</p>
          <p>● توافق على الامتثال لهذه الشروط والقوانين المعمول بها.</p>
          <p>
            ● تفهم أن Pocket Pi مخصص للاستخدام فقط داخل <b>Testnet/Mainnet</b>{" "}
            لشبكة Pi.
          </p>
          <hr />

          <h5>2. نظرة عامة على المنصة</h5>
          <p>Pocket Pi يقدم الخدمات التالية:</p>
          <p>● معاملات بين الأفراد داخل التطبيق.</p>
          <p>● تحويلات بين المحافظ الداخلية.</p>
          <p>● تحويل محدود مع محفظة Pi الرسمية.</p>
          <p>
            ● أدوات للأعمال مثل دفع الرواتب، إدارة دليل العناوين، وتحليلات
            المبيعات.
          </p>
          <hr />

          <h5>3. مسؤوليات المستخدم</h5>
          <p>توافق على:</p>
          <p>● الحفاظ على سرية عنوان المحفظة وبيانات الدخول الخاصة بك.</p>
          <p>● استخدام المنصة لأغراض قانونية فقط.</p>
          <p>
            ● عدم محاولة التلاعب أو الهندسة العكسية للمنصة أو تكاملها مع API
            الخاص بشبكة Pi.
          </p>
          <p>أنت مسؤول وحدك عن المعاملات التي تبدأها.</p>
          <hr />

          <h5>4. الرسوم والاشتراكات</h5>
          <p>● المعاملات الأساسية داخل محافظ Pocket Pi مجانية حتى حد يومي.</p>
          <p>● يتم فرض رسوم رمزية بعد تجاوز الحد.</p>
          <p>● رسوم ثابتة على التحويلات من/إلى محفظة Pi الرسمية.</p>
          <p>● رسوم اشتراك سنوية قد تنخفض مع زيادة الاستخدام.</p>
          <p>جميع الرسوم معلنة بوضوح وقابلة للتغيير مع إشعار مسبق.</p>
          <hr />

          <h5>5. استخدام البيانات</h5>
          <p>
            Pocket Pi يجمع بيانات محدودة وفقًا لسياسة الخصوصية. نحن{" "}
            <b>لا نصل إلى المفاتيح الخاصة أو نخزنها</b>، وكل المعاملات تتم عبر{" "}
            <b>واجهات Pi الآمنة</b>.
          </p>
          <hr />

          <h5>6. إنهاء الحساب</h5>
          <p>نحتفظ بالحق في تعليق أو إنهاء الحساب إذا:</p>
          <p>● تم انتهاك الشروط.</p>
          <p>● تم اكتشاف نشاط احتيالي أو غير قانوني.</p>
          <p>● انتهاك سياسات شبكة Pi.</p>
          <hr />

          <h5>7. تحديد المسؤولية</h5>
          <p>
            Pocket Pi مقدم "كما هو" و"حسب التوفر". نحن <b>غير مسؤولين</b> عن:
          </p>
          <p>● فقدان Pi بسبب المعاملات الخاطئة.</p>
          <p>● التوقف أو تغييرات في بيئة شبكة Pi.</p>
          <p>● الوصول غير المصرح به بسبب إهمال المستخدم.</p>
          <p>
            يرجى <b>التحقق من التفاصيل بدقة</b> قبل التأكيد.
          </p>
          <hr />

          <h5>8. التعديلات</h5>
          <p>
            قد نقوم بتحديث الشروط في أي وقت. سيتم نشر التحديثات داخل التطبيق
            وعلى قنواتنا الرسمية.
          </p>
          <hr />

          <h5>9. القانون المعمول به</h5>
          <p>
            تخضع هذه الشروط لمبادئ شبكة Pi ولوائح الأصول الرقمية المعمول بها.
          </p>
        </div>
      </div>
    </div>
  );
};

function TermsAndConditions() {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  return language == "Ar"
    ? arabicText(t, navigate)
    : language == "Hi"
    ? hindiText(t, navigate)
    : englishText(t, navigate);
}

export default TermsAndConditions;
