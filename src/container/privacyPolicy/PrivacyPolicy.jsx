import React from "react";
import Index from "../Index";

function PrivacyPolicy() {
  const navigate = Index.useNavigate();
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
          <p><b>Effective Date:</b> 08/04/2025</p>

          <p>
            At <b>Pocket Pi</b>, we are committed to protecting your privacy and
            ensuring transparency in how we collect, use, and store your data.
            This Privacy Policy outlines the type of personal and transactional
            information we may collect and how we use that information in
            relation to the Pocket Pi application, built within the Pi Network
            ecosystem.
          </p>
          <hr/>
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

          <hr/>

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

          <hr/>

          <h5>3. Data Sharing & Third Parties</h5>

          <p>
            We <b>do not sell</b>, rent, or share your data with any third
            parties. Data is used strictly within the scope of Pocket Pi's
            services and remains confined to the Pi Network environment.
          </p>

          <hr/>

          <h5>4. Data Security</h5>

          <p>We implement industry-standard security protocols to protect your data, including:</p>
        
        <p>●	End-to-end encryption of sensitive data</p>

        <p>●	Secured API communication with Pi Network</p>        

        <p>●	Access controls and role-based permissions in business dashboards</p>

        <hr/>

        <h5>5. User Rights</h5>
        
        <p>You have the right to:</p>
        
        <p>●	Access and review your personal and transactional data</p>
        
        <p>●	Request deletion of your Pocket Pi profile</p>

        <p>●	Opt-out of business services (for merchants)</p>

        <p>You can manage most settings directly through the app’s settings menu.</p>

        <hr/>

        <h5>6. Changes to this Policy</h5>

        <p>We may update this Privacy Policy to reflect changes in our practices or regulatory requirements. You will be notified of major changes through in-app notifications or email (if provided).</p>
        
        <hr/>

        
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
