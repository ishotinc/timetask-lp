"use client";

import React, { useEffect, useRef, useState } from "react";
import { Clock, BarChart2, Users, Play } from "lucide-react";
import "@/app/globals.css";

export function LandingPageComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime + 10) % 1000000); // Reset at 1,000,000 ms
    }, 10); // Update every 10ms for a faster animation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 360000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 360000) / 6000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 6000) / 100)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 100).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-teal-600">
              <Clock className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">TimeTrack</span>
            </a>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-teal-600"
              >
                機能
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-teal-600"
              >
                使い方
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-gray-600 hover:text-teal-600"
              >
                始める
              </button>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-teal-600 mr-4">
              ログイン
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
              アカウント登録
              <Play className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-100/20 to-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl font-bold text-teal-600/20 tabular-nums">
                {formatTime(time)}
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-teal-600 sm:text-5xl md:text-6xl">
                時間を管理し、生産性を最大化
              </h1>
              <p className="mt-3 text-xl text-gray-600 sm:mx-auto sm:mt-5 sm:max-w-xl">
                TimeTrackで簡単に時間を記録し、プロジェクトの進捗を可視化。チームの生産性を向上させましょう。
              </p>
              <form className="mt-8 sm:mx-auto sm:max-w-lg">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-base focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-red-500 px-6 py-3 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    アカウント登録
                    <Play className="ml-2 h-4 w-4 inline" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-teal-600 sm:text-4xl">
              主な機能
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  簡単な時間記録
                </h3>
                <p className="mt-2 text-gray-600">
                  ワンクリックで時間の記録を開始。プロジェクトや作業ごとに簡単に時間を追跡できます。
                </p>
              </div>
              <div className="text-center">
                <BarChart2 className="mx-auto h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  詳細なレポート
                </h3>
                <p className="mt-2 text-gray-600">
                  プロジェクトごとの時間使用状況を可視化。効率的な時間管理をサポートします。
                </p>
              </div>
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  チーム連携
                </h3>
                <p className="mt-2 text-gray-600">
                  チームメンバーの作業時間を簡単に把握。プロジェクトの進捗状況を共有できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-teal-600 sm:text-4xl">
              使い方
            </h2>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
                    1920x1080
                  </div>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LdEaIpVoZwRnosB201ErbWfnjho00P.png"
                    alt="TimeTrackインターフェース"
                    className="absolute inset-0 h-[85%] w-[92%] m-auto object-cover rounded"
                  />
                </div>
                <p className="mt-4 text-gray-600">
                  TimeTrackは直感的なインターフェースで、タスクの管理と時間の記録を簡単に行えます。
                  未着手、進行中、完了の3つのカラムでタスクを整理し、各タスクの所要時間を正確に把握できます。
                </p>
              </div>
              <div>
                <div className="relative aspect-[1170/2532] max-w-[293px] mx-auto overflow-hidden rounded-lg shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
                    1170x2532
                  </div>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zzJYDqxaaAI5a39Vi6cSwZShDvF0LB.png"
                    alt="タスク詳細ビュー"
                    className="absolute inset-0 h-[85%] w-[92%] m-auto object-cover rounded"
                  />
                </div>
                <p className="mt-4 text-gray-600">
                  各タスクの詳細ビューでは、ラベル、説明、チェックリスト、進捗状況を一目で確認できます。
                  さらに、コメント機能を使ってチームメンバーとコミュニケーションを取ることができます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="bg-teal-600 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              今すぐ始めましょう
            </h2>
            <p className="mt-4 text-xl text-teal-100">
              TimeTrackを使って、あなたのチームの生産性を向上させませんか？無料で始められます。
            </p>
            <button className="mt-8 rounded-md bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600">
              アカウント登録
              <Play className="ml-2 h-4 w-4 inline" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2023 TimeTrack Inc. All rights reserved.
          </p>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-teal-600 text-sm"
                >
                  利用規約
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-teal-600 text-sm"
                >
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
