'use client';

import React from 'react';
import PageBackLink from '@/components/PageBackLink';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-elevarm-black">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-header pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <PageBackLink />

        <div className="space-y-3">
          <p className="text-xs font-semibold text-elevarm-grey">Current as of 05 June 2023</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-elevarm-grey text-sm leading-relaxed">
            Your privacy is important to us at BISA. We respect your privacy regarding any information we may collect from you across our platform
          </p>
        </div>

        <div className="text-sm text-elevarm-grey leading-relaxed space-y-8">
          <p>
            This Privacy Policy has been crafted to facilitate users in comprehending the manner in which BISA collects, utilizes, discloses, and/or processes the Personal Data furnished by its users. The development of this privacy policy serves as a testament to BISA&apos;s steadfast dedication to safeguarding, preserving the privacy, confidentiality, and security of its users. BISA unequivocally declares that it shall never furnish any unauthorized party with personal data information of BISA users, as BISA is fully committed to ensuring the privacy of its users.
          </p>

          <LegalSection title="Consent">
            <ol className="list-decimal pl-5 space-y-2">
              <li>The term &ldquo;personal data&rdquo; refers to any information that we possess or control, which is directly or indirectly related to an individual to the extent that the individual can be identified or easily identifiable from the information, such as name, address, telephone number, identification card number, date of birth, email address, gender, race, banking details, credit/debit card details, etc.</li>
              <li>Your personal data may be collected from you when you interact with us in any way, including through any transactions and/or communications made from or with us.</li>
              <li>We may also collect your personal data from various sources, including but not limited to any meetings, events, activities, customer satisfaction surveys organized and/or sponsored by us, as well as from publicly available sources such as BISA directories and social media pages.</li>
              <li>Additionally, we may receive, store, and process your personal data that is made available or provided by authorized third parties, credit reference/reporting agencies, law enforcement and regulatory authorities.</li>
            </ol>
          </LegalSection>

          <LegalSection title="Purpose of Collection of Personal Data">
            <p>The personal data provided to us may be processed for the following purposes:</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Used for registration as a user account BISA App</li>
              <li>To process, manage, or verify your identity</li>
              <li>To provide, maintain, and improve the Platform and/or Services to you</li>
              <li>To fulfill and validate your purchases / reservations / requests</li>
              <li>To communicate with you and maintain and enhance customer relations</li>
              <li>To provide you with support and handle requests and complaints</li>
              <li>To facilitate your participation in contests, promotions, campaigns, surveys, or polls</li>
              <li>To conduct market research or surveys, internal marketing analysis, and customer profiling</li>
              <li>To protect and/or enforce our legal rights and interests</li>
              <li>To comply with our legal obligations and regulations under applicable laws</li>
              <li>To comply with law enforcement or governmental authority requests</li>
              <li>To detect, investigate, and prevent fraudulent, unlawful, or illegal activities</li>
              <li>To transfer or assign our rights, interests, and obligations under any agreed-upon agreements</li>
              <li>For administrative and internal updating purposes</li>
            </ol>
          </LegalSection>

          <LegalSection title="Your Rights">
            <ol className="list-decimal pl-5 space-y-2">
              <li>You have the right to request access, request copies, request updates or corrections to your personal data stored by us, subject to applicable data protection and privacy laws.</li>
              <li>You have the right, upon written notice, to withdraw your previously given consent to us, subject to applicable legal limitations and contractual provisions.</li>
              <li>You can rectify, update, or delete your personal data at any time by modifying your profile in the &ldquo;Account Settings&rdquo; page on the Platform.</li>
            </ol>
          </LegalSection>

          <LegalSection title="Security">
            <p>BISA strives at all times to ensure that User&apos;s personal data is maximally protected. BISA implements reasonable security measures to maintain and secure User&apos;s personal data. BISA also encourages Users to take steps to protect their Personal Data, including not disclosing passwords, not providing personal information to anyone, using complex passwords, and changing passwords regularly.</p>
          </LegalSection>

          <LegalSection title="Intellectual Property Rights">
            <ol className="list-decimal pl-5 space-y-2">
              <li>All text, data, images, graphics, audio and/or video information, and other materials on the Platform are the property of BISA and are protected by copyright, trademark, and/or other regulations regarding intellectual property rights.</li>
              <li>Users are prohibited from copying, displaying, downloading, modifying, reproducing, or creating derivative works from the Platform&apos;s components for commercial purposes without the written consent of BISA.</li>
            </ol>
          </LegalSection>

          <LegalSection title="Assistance">
            <p>If you have any questions about this Privacy Policy, or wish to file a complaint or request for access to data or correction relating to your personal data, you can contact us at <a href="mailto:hello@bisa.id" className="text-elevarm-cobalt font-semibold hover:underline">hello@bisa.id</a>.</p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
