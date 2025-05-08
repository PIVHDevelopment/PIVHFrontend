import React from "react";
import Index from "../Index";

const englishText = () => {
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Privacy Policy</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>Effective Date:</b> 08/04/2025
          </p>

          <p>
            At <b>Pocket Pi</b>, we are committed to protecting your privacy and
            ensuring transparency in how we collect, use, and store your data.
            This Privacy Policy outlines the type of personal and transactional
            information we may collect and how we use that information in
            relation to the Pocket Pi application, built within the Pi Network
            ecosystem.
          </p>
          <hr />
          <h5>1. Information We Collect</h5>

          <p>
            We collect and process the following data when you use Pocket Pi:
          </p>

          <h6>a. User Information</h6>

          <p>● Pi Network username and user ID (via Pi Authentication API)</p>

          <p>● Public wallet address</p>

          <p>● Profile information shared via Pi Platform</p>

          <h6>b. Transactional Data</h6>

          <p>● Wallet balance (read-only)</p>

          <p>
            ● Transaction history (amount, timestamp, sender/receiver addresses)
          </p>

          <p>● QR code generation for send/receive actions</p>

          <h6>c. Business-Specific Data (For Merchant Accounts)</h6>

          <p>● Business name and address</p>

          <p>● Employee wallet addresses (for salary disbursement)</p>

          <p>● Sales metrics and stats</p>

          <hr />

          <h5>2. How We Use Your Information</h5>

          <p>We use your information solely to:</p>

          <p>● Authenticate users using Pi Network APIs</p>

          <p>● Enable secure Pi transactions (send/receive)</p>

          <p>● Provide user and merchant dashboards</p>

          <p>● Generate QR codes for transaction facilitation</p>

          <p>● Automate business processes such as payroll</p>

          <p>● Improve user experience and service delivery</p>

          <p>
            We <b>do not</b> store or share any private keys or sensitive
            payment information. All Pi Network transactions are handled via
            secure Pi Network APIs.
          </p>

          <hr />

          <h5>3. Data Sharing & Third Parties</h5>

          <p>
            We <b>do not sell</b>, rent, or share your data with any third
            parties. Data is used strictly within the scope of Pocket Pi's
            services and remains confined to the Pi Network environment.
          </p>

          <hr />

          <h5>4. Data Security</h5>

          <p>
            We implement industry-standard security protocols to protect your
            data, including:
          </p>

          <p>● End-to-end encryption of sensitive data</p>

          <p>● Secured API communication with Pi Network</p>

          <p>
            ● Access controls and role-based permissions in business dashboards
          </p>

          <hr />

          <h5>5. User Rights</h5>

          <p>You have the right to:</p>

          <p>● Access and review your personal and transactional data</p>

          <p>● Request deletion of your Pocket Pi profile</p>

          <p>● Opt-out of business services (for merchants)</p>

          <p>
            You can manage most settings directly through the app’s settings
            menu.
          </p>

          <hr />

          <h5>6. Changes to this Policy</h5>

          <p>
            We may update this Privacy Policy to reflect changes in our
            practices or regulatory requirements. You will be notified of major
            changes through in-app notifications or email (if provided).
          </p>

          <hr />
        </div>
      </div>
    </div>
  );
};

const hindiText = () => {
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>गोपनीयता नीति</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>प्रभावी तिथि:</b> 08/04/2025
          </p>

          <p>
            <b>Pocket Pi</b> में, हम आपकी गोपनीयता की सुरक्षा और यह सुनिश्चित
            करने के लिए प्रतिबद्ध हैं कि हम आपके डेटा को कैसे एकत्रित, उपयोग और
            संग्रहित करते हैं। यह गोपनीयता नीति उस प्रकार की व्यक्तिगत और
            लेन-देन संबंधी जानकारी को रेखांकित करती है जिसे हम एकत्रित कर सकते
            हैं और Pocket Pi एप्लिकेशन के संबंध में उसका उपयोग कैसे करते हैं, जो
            Pi Network पारिस्थितिकी तंत्र के भीतर बनाया गया है।
          </p>
          <hr />
          <h5>1. हम कौन सी जानकारी एकत्रित करते हैं</h5>

          <p>
            जब आप Pocket Pi का उपयोग करते हैं, तो हम निम्नलिखित डेटा एकत्रित और
            संसाधित करते हैं:
          </p>

          <h6>क. उपयोगकर्ता जानकारी</h6>

          <p>
            ● Pi Network उपयोगकर्ता नाम और उपयोगकर्ता आईडी (Pi प्रमाणीकरण API के
            माध्यम से)
          </p>

          <p>● सार्वजनिक वॉलेट पता</p>

          <p>● Pi प्लेटफ़ॉर्म के माध्यम से साझा की गई प्रोफ़ाइल जानकारी</p>

          <h6>ख. लेन-देन संबंधी डेटा</h6>

          <p>● वॉलेट बैलेंस (केवल पढ़ने के लिए)</p>

          <p>● लेन-देन इतिहास (राशि, समय-चिह्न, प्रेषक/प्राप्तकर्ता पते)</p>

          <p>● भेजने/प्राप्त करने की क्रियाओं के लिए QR कोड जनरेशन</p>

          <h6>ग. व्यवसाय-विशिष्ट डेटा (व्यापारी खातों के लिए)</h6>

          <p>● व्यवसाय का नाम और पता</p>

          <p>● कर्मचारियों के वॉलेट पते (वेतन वितरण के लिए)</p>

          <p>● बिक्री मीट्रिक्स और आंकड़े</p>

          <hr />

          <h5>2. हम आपकी जानकारी का उपयोग कैसे करते हैं</h5>

          <p>हम आपकी जानकारी का उपयोग केवल निम्नलिखित के लिए करते हैं:</p>

          <p>● Pi Network API का उपयोग करके उपयोगकर्ताओं को प्रमाणित करना</p>

          <p>● सुरक्षित Pi लेन-देन (भेजना/प्राप्त करना) सक्षम करना</p>

          <p>● उपयोगकर्ता और व्यापारी डैशबोर्ड प्रदान करना</p>

          <p>● लेन-देन सुविधा के लिए QR कोड जनरेट करना</p>

          <p>● पेरोल जैसे व्यावसायिक प्रक्रियाओं को स्वचालित करना</p>

          <p>● उपयोगकर्ता अनुभव और सेवा वितरण में सुधार करना</p>

          <p>
            हम <b>किसी भी</b> निजी कुंजी या संवेदनशील भुगतान जानकारी को संग्रहीत
            या साझा <b>नहीं</b> करते हैं। सभी Pi Network लेन-देन सुरक्षित Pi
            Network API के माध्यम से संभाले जाते हैं।
          </p>

          <hr />

          <h5>3. डेटा साझा करना और तृतीय पक्ष</h5>

          <p>
            हम आपका डेटा <b>बेचते</b>, किराए पर देते या किसी भी तृतीय पक्ष के
            साथ साझा <b>नहीं</b> करते हैं। डेटा का उपयोग केवल Pocket Pi की
            सेवाओं के दायरे में किया जाता है और यह Pi Network वातावरण तक ही
            सीमित रहता है।
          </p>

          <hr />

          <h5>4. डेटा सुरक्षा</h5>

          <p>
            हम आपकी डेटा की सुरक्षा के लिए उद्योग-मानक सुरक्षा प्रोटोकॉल लागू
            करते हैं, जिनमें शामिल हैं:
          </p>

          <p>● संवेदनशील डेटा का एंड-टू-एंड एन्क्रिप्शन</p>

          <p>● Pi Network के साथ सुरक्षित API संचार</p>

          <p>
            ● व्यावसायिक डैशबोर्ड में एक्सेस नियंत्रण और भूमिका-आधारित अनुमतियाँ
          </p>

          <hr />

          <h5>5. उपयोगकर्ता अधिकार</h5>

          <p>आपके पास निम्नलिखित अधिकार हैं:</p>

          <p>
            ● अपनी व्यक्तिगत और लेन-देन संबंधी डेटा तक पहुंच और समीक्षा करना
          </p>

          <p>● अपने Pocket Pi प्रोफ़ाइल को हटाने का अनुरोध करना</p>

          <p>● व्यावसायिक सेवाओं से बाहर निकलना (व्यापारियों के लिए)</p>

          <p>
            आप अधिकांश सेटिंग्स को सीधे ऐप की सेटिंग्स मेनू के माध्यम से
            प्रबंधित कर सकते हैं।
          </p>

          <hr />

          <h5>6. इस नीति में परिवर्तन</h5>

          <p>
            हम अपनी प्रथाओं या नियामक आवश्यकताओं में बदलाव को दर्शाने के लिए इस
            गोपनीयता नीति को अपडेट कर सकते हैं। आपको प्रमुख परिवर्तनों के बारे
            में इन-ऐप सूचनाओं या ईमेल (यदि प्रदान किया गया हो) के माध्यम से
            सूचित किया जाएगा।
          </p>

          <hr />
        </div>
      </div>
    </div>
  );
};

const arabicText = () => {
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>سياسة الخصوصية</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content">
        <div className="terms-text">
          <p>
            <b>تاريخ السريان:</b> 08/04/2025
          </p>

          <p>
            في <b>Pocket Pi</b>، نحن ملتزمون بحماية خصوصيتك وضمان الشفافية في
            كيفية جمعنا واستخدامنا وتخزيننا لبياناتك. توضح سياسة الخصوصية هذه
            نوع المعلومات الشخصية والمعاملات التي قد نجمعها وكيفية استخدامنا
            لتلك المعلومات فيما يتعلق بتطبيق Pocket Pi، المبني داخل نظام Pi
            Network البيئي.
          </p>
          <hr />
          <h5>1. المعلومات التي نجمعها</h5>

          <p>نجمع ونعالج البيانات التالية عند استخدامك لتطبيق Pocket Pi:</p>

          <h6>أ. معلومات المستخدم</h6>

          <p>
            ● اسم المستخدم ومعرف المستخدم في شبكة Pi (عبر Pi Authentication API)
          </p>

          <p>● عنوان المحفظة العامة</p>

          <p>● معلومات الملف الشخصي المشتركة عبر منصة Pi</p>

          <h6>ب. بيانات المعاملات</h6>

          <p>● رصيد المحفظة (للقراءة فقط)</p>

          <p>● سجل المعاملات (القيمة، الوقت، عناوين المرسل/المستلم)</p>

          <p>● إنشاء رمز QR للإرسال/الاستلام</p>

          <h6>ج. بيانات خاصة بالأعمال (لحسابات التجار)</h6>

          <p>● اسم النشاط التجاري وعنوانه</p>

          <p>● عناوين محافظ الموظفين (لتوزيع الرواتب)</p>

          <p>● مقاييس وأرقام المبيعات</p>

          <hr />

          <h5>2. كيف نستخدم معلوماتك</h5>

          <p>نستخدم معلوماتك فقط من أجل:</p>

          <p>● مصادقة المستخدمين باستخدام واجهات Pi API</p>

          <p>● تمكين المعاملات الآمنة باستخدام Pi (إرسال/استلام)</p>

          <p>● توفير لوحات معلومات للمستخدمين والتجار</p>

          <p>● إنشاء رموز QR لتسهيل المعاملات</p>

          <p>● أتمتة العمليات التجارية مثل الرواتب</p>

          <p>● تحسين تجربة المستخدم وجودة الخدمة</p>

          <p>
            نحن <b>لا</b> نقوم بتخزين أو مشاركة المفاتيح الخاصة أو معلومات الدفع
            الحساسة. تتم معالجة جميع معاملات شبكة Pi عبر واجهات Pi API الآمنة.
          </p>

          <hr />

          <h5>3. مشاركة البيانات مع أطراف ثالثة</h5>

          <p>
            نحن <b>لا</b> نبيع أو نؤجر أو نشارك بياناتك مع أي أطراف ثالثة. يتم
            استخدام البيانات فقط ضمن نطاق خدمات Pocket Pi وتبقى داخل بيئة شبكة
            Pi.
          </p>

          <hr />

          <h5>4. أمان البيانات</h5>

          <p>
            نقوم بتطبيق بروتوكولات أمان قياسية في الصناعة لحماية بياناتك، بما في
            ذلك:
          </p>

          <p>● التشفير من الطرف إلى الطرف للبيانات الحساسة</p>

          <p>● اتصال API آمن مع شبكة Pi</p>

          <p>
            ● ضوابط وصول وصلاحيات مبنية على الأدوار في لوحات معلومات الأعمال
          </p>

          <hr />

          <h5>5. حقوق المستخدم</h5>

          <p>لديك الحق في:</p>

          <p>● الوصول إلى بياناتك الشخصية والمعاملات ومراجعتها</p>

          <p>● طلب حذف ملفك الشخصي في Pocket Pi</p>

          <p>● الانسحاب من الخدمات التجارية (للتجار)</p>

          <p>
            يمكنك إدارة معظم الإعدادات مباشرة من خلال قائمة إعدادات التطبيق.
          </p>

          <hr />

          <h5>6. التغييرات على هذه السياسة</h5>

          <p>
            قد نقوم بتحديث سياسة الخصوصية هذه لتعكس التغييرات في ممارساتنا أو
            المتطلبات التنظيمية. سيتم إعلامك بالتغييرات الرئيسية من خلال إشعارات
            داخل التطبيق أو البريد الإلكتروني (إذا تم توفيره).
          </p>

          <hr />
        </div>
      </div>
    </div>
  );
};

function PrivacyPolicy() {
  const navigate = Index.useNavigate();
  return englishText();
}

export default PrivacyPolicy;
