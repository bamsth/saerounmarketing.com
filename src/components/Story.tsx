import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";

export default function Story() {
  return (
    <section id="story" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* 상단 레이블 */}
        <p className="text-blue-500 text-sm font-medium tracking-wider mb-12">
          Our Story
        </p>

        <FadeIn>
        {/* 큰 인용구 — 시각적 앵커 역할 */}
        <div className="mb-16">
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight max-w-3xl">
            &ldquo;전문성을 키우고 알리는 것.
            <br />
            <span className="text-blue-500">이것이 유일한 생존 전략입니다.&rdquo;</span>
          </blockquote>
          {/* 프로필 이미지 + 이름 */}
          <div className="mt-6 flex items-center gap-3">
            <Image
              src="/profile.png"
              alt="김범수 수의사"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <span className="text-slate-500 text-sm">
              김범수 &nbsp;·&nbsp; 수의사, 마케팅 컨설턴트
            </span>
          </div>
        </div>

        </FadeIn>

        <FadeIn delay={0.1}>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-12">
          수의사가 왜 마케팅을 하냐고요?
        </h2>
        </FadeIn>

        <Stagger className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <StaggerItem className="py-8 md:py-0 md:pr-10">
            <h3 className="font-bold text-slate-900 mb-3 text-base">
              가격 경쟁의 한계를 깨달은 순간
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              가금 수의사로 시작했습니다. 전문성을 갖추고 농장주들을 도왔지만,
              수의사 면허 없는 경쟁자들이 동물약품 유통을 하며 가격으로만
              승부하는 현실에 부딪혔습니다.
            </p>
          </StaggerItem>
          <StaggerItem className="py-8 md:py-0 md:px-10">
            <h3 className="font-bold text-slate-900 mb-3 text-base">
              전문성만이 살 길이다
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              가격으로 경쟁하는 순간, 전문가는 사라집니다. 살아남으려면
              전문성을 키우고, 그것을 제대로 알려야 한다는 것을 깨달았습니다.
            </p>
          </StaggerItem>
          <StaggerItem className="py-8 md:py-0 md:pl-10">
            <h3 className="font-bold text-slate-900 mb-3 text-base">
              동물병원 원장님들도 마찬가지
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              압도적인 실력이 있어도, 보호자에게 그 가치가 전달되지 않으면
              의미가 없습니다. 그래서 시작했습니다. 원장님의 전문성을
              보호자의 언어로 번역하는 일을.
            </p>
          </StaggerItem>
        </Stagger>

      </div>
    </section>
  );
}
