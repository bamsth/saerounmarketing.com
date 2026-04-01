import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 새로운마케팅",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200 py-5 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-slate-400 hover:text-slate-700 text-sm transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          개인정보처리방침
        </h1>
        <p className="text-slate-500 text-sm mb-12">최종 업데이트: 2026년 4월 1일</p>

        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              1. 개인정보의 처리 목적
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              새로운마케팅(이하 &ldquo;회사&rdquo;)은 다음의 목적을 위하여 개인정보를 처리합니다.
              처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이
              변경될 시에는 사전 동의를 구할 예정입니다.
            </p>
            <ul className="mt-3 space-y-1 text-slate-600 text-sm list-disc list-inside">
              <li>마케팅 상담 서비스 제공 및 상담 내용 확인</li>
              <li>상담 신청에 대한 회신 및 안내</li>
              <li>서비스 개선을 위한 통계 분석</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              2. 처리하는 개인정보의 항목
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              회사는 상담 신청 시 아래와 같은 개인정보를 수집합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-700 font-semibold">
                    <th className="text-left pb-2">항목</th>
                    <th className="text-left pb-2">수집 목적</th>
                    <th className="text-left pb-2">보유 기간</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y divide-slate-200">
                  <tr>
                    <td className="py-2">이름</td>
                    <td className="py-2">상담자 식별</td>
                    <td className="py-2">상담 완료 후 1년</td>
                  </tr>
                  <tr>
                    <td className="py-2">병원명</td>
                    <td className="py-2">맞춤 상담 제공</td>
                    <td className="py-2">상담 완료 후 1년</td>
                  </tr>
                  <tr>
                    <td className="py-2">연락처 (전화/이메일)</td>
                    <td className="py-2">상담 회신</td>
                    <td className="py-2">상담 완료 후 1년</td>
                  </tr>
                  <tr>
                    <td className="py-2">마케팅 고민 내용</td>
                    <td className="py-2">상담 내용 파악</td>
                    <td className="py-2">상담 완료 후 1년</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              3. 개인정보의 보유 및 이용기간
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
              수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              상담 완료 후 1년이 경과하면 해당 개인정보를 지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및
              제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              현재 회사는 개인정보를 제3자에게 제공하고 있지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              5. 개인정보처리의 위탁
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              회사는 이메일 발송을 위해 EmailJS 서비스를 이용합니다.
              상담 신청 내용은 EmailJS를 통해 전달되며, EmailJS의 개인정보처리방침이 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              6. 정보주체의 권리·의무 및 행사방법
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="mt-3 space-y-1 text-slate-600 text-sm list-disc list-inside">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              권리 행사는 아래 연락처를 통해 요청하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              7. 개인정보 보호책임자
            </h2>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 space-y-1">
              <p><span className="font-medium text-slate-800">책임자:</span> 김범수</p>
              <p><span className="font-medium text-slate-800">이메일:</span> saerounmarketing@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              8. 개인정보처리방침의 변경
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              이 개인정보처리방침은 2026년 4월 1일부터 적용됩니다.
              내용 변경 시 웹사이트를 통해 공지합니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
