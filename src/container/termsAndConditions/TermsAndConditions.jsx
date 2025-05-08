import React from "react";
import Index from "../Index";

function TermsAndConditions() {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
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
      <p><b>Effective Date:</b> 08/04/2025</p>
        
        <p>Welcome to <b>Pocket Pi</b> – a non-custodial, Pi Network-integrated platform designed to provide secure and seamless Pi transactions for individuals and businesses. By accessing or using the Pocket Pi app, you agree to be bound by the following Terms of Service.</p>
        <hr/>

      <h5>1. Acceptance of Terms</h5>

      <p>By using Pocket Pi, you confirm that you:</p>
      
      <p>●	Are a verified Pi Network user.</p>
      
      <p>●	Agree to comply with these Terms of Service and any applicable laws or regulations.</p>
      
      <p>●	Understand that Pocket Pi is built for use exclusively within the <b>Pi Network Testnet/Mainnet</b>, and your activity will remain within its ecosystem.</p>
      <hr/>
      <h5>2. Platform Overview</h5>

      <p>Pocket Pi provides the following services:</p>

      <p>●	Peer-to-peer Pi transactions between users of Pocket Pi.</p>

      <p>●	Wallet-to-wallet transfers with Pocket Pi’s internal wallets.</p>

      <p>●	Controlled transfer to/from the official Pi Network wallet (non-custodial).</p>

      <p>●	Business tools including employee payout, address book management, and sales analytics.</p>
      <hr/>
      <h5>3. User Responsibilities</h5>
      
      <p>You agree to:</p>

      <p>●	Maintain the security and confidentiality of your wallet address and credentials.</p>

      <p>●	Use the platform only for lawful purposes.</p>

      <p>●	Not attempt to reverse engineer, modify, or interfere with the platform or its integrations with Pi Network APIs.</p>

      <p>You are solely responsible for any transactions initiated through your account.</p>
      <hr/>
      <h5>4. Fees and Subscriptions</h5>

      <p>●	Basic transactions within Pocket Pi wallets are free up to a daily limit.</p>

      <p>●	A nominal fee applies beyond that limit.</p>

      <p>●	Transfers to/from Pi Network wallets carry a flat fee.</p>
      
    <p>●	Annual subscription fee, which may decrease as usage grows.</p>      
      
      <p>All fees are clearly displayed and subject to change with prior notice.</p>
      <hr/>
      <h5>5. Data Usage</h5>

      <p>Pocket Pi collects limited personal and transaction data, strictly as outlined in our Privacy Policy. We <b>do not access or store </b>private keys, and all interactions occur through <b>secure Pi Network APIs</b>.</p>
      <hr/>
      <h5>6. Account Termination</h5>

      <p>We reserve the right to suspend or terminate user access if:</p>


      <p>●	The user violates these Terms.</p>

      <p>●	Fraudulent, abusive, or illegal activity is detected.</p>

      <p>●	There is a breach of Pi Network rules or ecosystem policies.</p>

      <hr/>
      
      <h5>7. Limitation of Liability</h5>

      <p>Pocket Pi is provided on an “as-is” and “as-available” basis. While we strive for reliability and uptime, we are <b>not liable</b> for:</p>

      <p>●	Loss of Pi due to incorrect transactions.</p>

<p>●	Downtime or changes in the Pi Network environment.</p>

<p>●	Unauthorized access due to user negligence.</p>


<p>Users are advised to <b>verify addresses and transaction details carefully</b> before confirming.</p>

<hr/>

<h5>8. Modifications</h5>


<p>We may revise these Terms at any time. Updated terms will be posted within the app and on our official channels. Continued use of the platform after updates constitutes acceptance.</p>

<hr/>

<h5>9. Governing Law</h5>

<p>These Terms are governed by the principles of the Pi Network ecosystem and applicable digital asset regulations where applicable.</p>

<hr/>



      
      
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
