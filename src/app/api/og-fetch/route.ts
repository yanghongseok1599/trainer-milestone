import { NextRequest, NextResponse } from "next/server";

interface OGData {
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  url: string;
}

// OG 태그 추출 함수
function extractOGTags(html: string, url: string): OGData {
  const getMetaContent = (property: string): string | null => {
    // og:property 형식
    const ogMatch = html.match(
      new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']+)["']`, "i")
    );
    if (ogMatch) return ogMatch[1];

    // content가 먼저 오는 경우
    const ogMatch2 = html.match(
      new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:${property}["']`, "i")
    );
    if (ogMatch2) return ogMatch2[1];

    return null;
  };

  const getMetaName = (name: string): string | null => {
    const match = html.match(
      new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i")
    );
    if (match) return match[1];

    const match2 = html.match(
      new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i")
    );
    if (match2) return match2[1];

    return null;
  };

  // 타이틀 추출
  let title = getMetaContent("title");
  if (!title) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : "";
  }

  // 설명 추출
  let description = getMetaContent("description");
  if (!description) {
    description = getMetaName("description") || "";
  }

  // 이미지 추출
  let image = getMetaContent("image");
  if (image && !image.startsWith("http")) {
    // 상대 경로 처리
    const urlObj = new URL(url);
    image = image.startsWith("/")
      ? `${urlObj.origin}${image}`
      : `${urlObj.origin}/${image}`;
  }

  // 사이트명 추출
  const siteName = getMetaContent("site_name");

  return {
    title: title || "제목 없음",
    description: description || "",
    image,
    siteName,
    url,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL이 필요합니다" }, { status: 400 });
    }

    // URL 유효성 검사
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "올바른 URL 형식이 아닙니다" }, { status: 400 });
    }

    // 페이지 HTML 가져오기
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `페이지를 불러올 수 없습니다 (${response.status})` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const ogData = extractOGTags(html, url);

    return NextResponse.json(ogData);
  } catch (error) {
    console.error("OG fetch error:", error);
    return NextResponse.json(
      { error: "페이지 정보를 가져오는 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
