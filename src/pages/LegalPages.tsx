import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import {
  Shield,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  ArrowLeft,
  Building,
  Phone,
  Scale
} from 'lucide-react';

interface LegalPageProps {
  page: 'about' | 'contact' | 'privacy' | 'terms' | 'copyright-policy' | 'copyright-removal';
  complaintData?: { articleId: string; articleHeadline: string };
}

export const LegalPages: React.FC<LegalPageProps> = ({ page, complaintData }) => {
  const { lang, t } = useLanguage();
  const { goToHome } = useNav();

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  // Copyright Complaint Form State
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaintTicket, setComplaintTicket] = useState('');
  const [complaintForm, setComplaintForm] = useState({
    articleId: complaintData?.articleId || '',
    articleHeadline: complaintData?.articleHeadline || '',
    complainantName: '',
    complainantEmail: '',
    complainantOrganization: '',
    copyrightOwner: '',
    infringedWorkUrl: '',
    statementOfRights: 'I have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.',
    explanation: ''
  });
  const [complaintError, setComplaintError] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintError(null);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaintForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setComplaintSubmitted(true);
        setComplaintTicket(data.complaintId || 'NW-COMP-01');
      } else {
        setComplaintError(data.error || 'Failed to submit complaint');
      }
    } catch (err: any) {
      setComplaintError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8">
      <button
        onClick={goToHome}
        className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 font-sans transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{t('home')}</span>
      </button>

      {/* ABOUT US */}
      {page === 'about' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-500">
              Institutional Overview
            </span>
            <h1 className="font-editorial-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-stone-50 mt-1">
              {lang === 'bn' ? 'আমাদের সম্পর্কে — নিউজ ওয়ার্ল্ড' : 'About NEWS WORLD'}
            </h1>
          </div>

          <div className="font-editorial-body text-base text-stone-800 dark:text-stone-200 space-y-4 leading-relaxed">
            <p>
              {lang === 'bn'
                ? 'নিউজ ওয়ার্ল্ড একটি আধুনিক, দায়িত্বশীল ও প্রযুক্তি-বান্ধব আন্তর্জাতিক সংবাদ প্রকাশনা মাধ্যম। আমাদের প্রধান লক্ষ্য হলো জটিল বৈশ্বিক রাজনীতি, বিজ্ঞান, মহাকাশ, আধুনিক প্রযুক্তি, অর্থনীতি এবং মানবিক জ্ঞানকে বাংলা ও ইংরেজি উভয় ভাষায় নিরপেক্ষ ও বস্তুনিষ্ঠভাবে পাঠকদের নিকট উপস্থাপন করা।'
                : 'NEWS WORLD is an independent international bilingual journalism portal designed to deliver factual, verified global reporting across sixteen distinct knowledge categories in both English and formal Bengali (Bangla).'}
            </p>

            <h3 className="font-editorial-title text-xl font-bold text-stone-900 dark:text-stone-100 pt-4">
              {lang === 'bn' ? 'আমাদের সম্পাদকীয় দর্শন ও এআই নীতিমালা' : 'Editorial Philosophy & AI Ethics'}
            </h3>
            <p>
              {lang === 'bn'
                ? '১. মৌলিক রচনা: আমরা কখনোই কোনো তৃতীয় পক্ষের ওয়েবসাইট থেকে অনুচ্ছেদ বা নিবন্ধ সরাসরি হুবহু কপি করি না। সকল তথ্য বিশ্বস্ত প্রেস ওয়্যার থেকে সংগ্রহ করে তা মৌলিক বিশ্লেষণ ও নতুন শব্দবিন্যাসে পরিবেশন করা হয়।'
                : '1. Original Synthesis: We strictly prohibit verbatim copy-pasting of articles. Content is synthesized from accredited multilateral press releases into original drafts in fresh journalistic wording.'}
            </p>
            <p>
              {lang === 'bn'
                ? '২. মানব সম্পাদকের চূড়ান্ত অনুমোদন: কোনো এআই-জেনারেটেড সংবাদ স্বয়ংক্রিয়ভাবে সরাসরি প্রকাশিত হয় না। প্রত্যেকটি ড্রাফট অ্যাডমিন ড্যাশবোর্ডে "পেন্ডিং" অবস্থায় জমা হয় এবং মানব সম্পাদকের গভীর যাচাই-বাছাই ও অনুমোদনের পরই ওয়েবসাইটে আসে।'
                : '2. Mandatory Human Approval: No artificial intelligence draft is ever published autonomously. Every item is quarantined in a Pending status until authorized senior editors review facts, translations, and ethical standards.'}
            </p>
            <p>
              {lang === 'bn'
                ? '৩. মৌলিক এআই চিত্রায়ণ: নিবন্ধে ব্যবহৃত চিত্রসমূহ গুগল সার্চ বা অন্যের কপিরাইটযুক্ত ছবি নয়; বরং নিবন্ধের বিষয়ের ওপর ভিত্তি করে সরাসরি এআই দ্বারা চিত্রিত এবং স্পষ্টভাবে চিহ্নিত।'
                : '3. Original Editorial Visuals: Images are generated specifically for each report to eliminate reliance on unauthorized third-party photography, and are labeled with complete provenance.'}
            </p>
          </div>
        </div>
      )}

      {/* CONTACT US */}
      {page === 'contact' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-500">
              Inquiries & Bureau
            </span>
            <h1 className="font-editorial-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-stone-50 mt-1">
              {t('contactUs')}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-xs text-stone-700 dark:text-stone-300">
              <p className="text-sm leading-relaxed">
                {lang === 'bn'
                  ? 'সম্পাদকীয় ডেস্ক, প্রেস বিজ্ঞপ্তি, কারিগরি সহায়তা বা যেকোনো অনুসন্ধানের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                  : 'Get in touch with the NEWS WORLD global editorial desk, press bureau, or technology team.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>editorial@newsworld-portal.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-amber-600" />
                  <span>International Media Center, Geneva / Global Remote Bureau</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>+880 1700-000000 / +41 22 500 0000</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="p-6 rounded-xl bg-stone-100/70 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              {contactSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে' : 'Inquiry Transmitted Successfully'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'bn' ? 'আমাদের সম্পাদকীয় প্রতিনিধি ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।' : 'Our editorial bureau will respond within 24 operational hours.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold rounded hover:bg-stone-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COPYRIGHT COMPLAINT / REMOVAL */}
      {page === 'copyright-removal' && (
        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-rose-700 dark:text-rose-500">
              Notice and Takedown Procedure
            </span>
            <h1 className="font-editorial-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-stone-50 mt-1">
              {lang === 'bn' ? 'কপিরাইট আপত্তি ও অপসারণ আবেদন' : 'Copyright Complaint & Content Removal Form'}
            </h1>
            <p className="font-editorial-body text-xs sm:text-sm text-stone-500 mt-1">
              NEWS WORLD respects intellectual property rights. If you believe any content infringes your copyright, submit this form for immediate editorial review and unpublishing.
            </p>
          </div>

          {complaintSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-editorial-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'অভিযোগ সফলভাবে গৃহীত হয়েছে' : 'Copyright Notice Received'}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                Your ticket reference is <strong className="font-mono text-emerald-700 dark:text-emerald-300">{complaintTicket}</strong>. The article has been flagged in our Admin Dashboard for immediate review and possible unpublishing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleComplaintSubmit} className="space-y-4 p-6 rounded-xl bg-stone-100/70 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
              {complaintError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded border border-rose-200 text-xs">
                  {complaintError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Your Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={complaintForm.complainantName}
                    onChange={(e) => setComplaintForm({ ...complaintForm, complainantName: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={complaintForm.complainantEmail}
                    onChange={(e) => setComplaintForm({ ...complaintForm, complainantEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Copyright Owner / Entity Represented *
                  </label>
                  <input
                    type="text"
                    required
                    value={complaintForm.copyrightOwner}
                    onChange={(e) => setComplaintForm({ ...complaintForm, copyrightOwner: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Link to Original Authorized Work *
                  </label>
                  <input
                    type="url"
                    required
                    value={complaintForm.infringedWorkUrl}
                    onChange={(e) => setComplaintForm({ ...complaintForm, infringedWorkUrl: e.target.value })}
                    placeholder="https://original-publisher.com/work"
                    className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                  Target Article Headline / ID on NEWS WORLD
                </label>
                <input
                  type="text"
                  value={complaintForm.articleHeadline}
                  onChange={(e) => setComplaintForm({ ...complaintForm, articleHeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                  Detailed Explanation of the Disputed Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={complaintForm.explanation}
                  onChange={(e) => setComplaintForm({ ...complaintForm, explanation: e.target.value })}
                  placeholder="Specify which exact passages, statements, or representations are in dispute..."
                  className="w-full px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="p-3 bg-stone-200/60 dark:bg-stone-800 rounded text-[11px] text-stone-600 dark:text-stone-400">
                <p>
                  <strong>Legal Certification:</strong> By submitting, you certify under penalty of perjury that the information provided is accurate and that you are the copyright owner or authorized to act on behalf of the owner.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded transition-colors text-xs"
              >
                Submit Removal Notice for Editorial Takedown
              </button>
            </form>
          )}
        </div>
      )}

      {/* PRIVACY POLICY */}
      {page === 'privacy' && (
        <div className="space-y-4 font-editorial-body text-base text-stone-800 dark:text-stone-200 leading-relaxed">
          <h1 className="font-editorial-title text-3xl font-bold text-stone-950 dark:text-stone-50 pb-2 border-b border-stone-200 dark:border-stone-800">
            Privacy Policy
          </h1>
          <p>
            NEWS WORLD is committed to respecting user privacy. We do not engage in invasive cross-site behavioral tracking or sell user data to advertising brokers.
          </p>
          <h3 className="font-editorial-title text-xl font-bold pt-2">Data Collection & Storage</h3>
          <p>
            When users interact with our website, standard web server logs (IP address, user agent, requested pages) are recorded for security monitoring, DDOS protection, and rate limiting. Cookies are strictly limited to language selection and theme preferences.
          </p>
        </div>
      )}

      {/* TERMS & CONDITIONS */}
      {page === 'terms' && (
        <div className="space-y-4 font-editorial-body text-base text-stone-800 dark:text-stone-200 leading-relaxed">
          <h1 className="font-editorial-title text-3xl font-bold text-stone-950 dark:text-stone-50 pb-2 border-b border-stone-200 dark:border-stone-800">
            Terms & Conditions
          </h1>
          <p>
            By accessing NEWS WORLD, you agree to comply with international fair-use principles. You may read, quote, and share links to our articles provided that proper attribution to NEWS WORLD is maintained.
          </p>
        </div>
      )}

      {/* COPYRIGHT POLICY */}
      {page === 'copyright-policy' && (
        <div className="space-y-4 font-editorial-body text-base text-stone-800 dark:text-stone-200 leading-relaxed">
          <h1 className="font-editorial-title text-3xl font-bold text-stone-950 dark:text-stone-50 pb-2 border-b border-stone-200 dark:border-stone-800">
            Copyright Policy & Attribution Standards
          </h1>
          <p>
            NEWS WORLD operates under strict compliance with international copyright treaties, Berne Convention guidelines, and fair reporting practices.
          </p>
          <p>
            Our AI synthesis pipelines are programmed never to reproduce copyrighted article text verbatim. In the event of an inadvertent overlap, rights holders can use our Content Removal Page for immediate resolution.
          </p>
        </div>
      )}
    </div>
  );
};
