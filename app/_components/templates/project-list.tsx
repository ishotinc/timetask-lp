"use client";

import { Card, CardContent } from "@/app/_components/atoms/card";
import { PlusCircle, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

// プロジェクトの型定義
type Project = {
  id: string;
  name: string;
  totalTime: number; // 分単位での合計時間
};

// サンプルプロジェクトデータ
const projects: Project[] = [
  { id: "1", name: "ウェブサイトリニューアル", totalTime: 12345 },
  { id: "2", name: "モバイルアプリ開発", totalTime: 54321 },
  { id: "3", name: "データ分析ダッシュボード", totalTime: 98765 },
  { id: "4", name: "マーケティングキャンペーン", totalTime: 23456 },
];

// 分を◯d ◯h◯m形式にフォーマットする関数
function formatDuration(minutes: number): string {
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const mins = minutes % 60;

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0 || days > 0) result += `${hours}h`;
  result += `${mins}m`;

  return result.trim();
}

export function ProjectList() {
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    projectId = "";
    router.push(`/project/${projectId}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">プロジェクト一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleProjectClick(project.id)}
          >
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2" size={16} />
                <span className="font-mono">
                  {formatDuration(project.totalTime)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-dashed border-2 flex items-center justify-center cursor-pointer">
          <CardContent className="p-4 text-center">
            <PlusCircle className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-sm text-gray-500">新規プロジェクトを追加</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
