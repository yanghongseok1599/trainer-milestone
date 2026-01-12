import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=kakao_${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=no_code", request.url)
    );
  }

  try {
    // 카카오 토큰 발급
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Kakao token error:", tokenData);
      return NextResponse.redirect(
        new URL("/login?error=token_failed", request.url)
      );
    }

    // 카카오 사용자 정보 조회
    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const userData = await userResponse.json();

    if (!userData.id) {
      return NextResponse.redirect(
        new URL("/login?error=user_info_failed", request.url)
      );
    }

    // 사용자 정보를 쿠키나 세션에 저장하고 리다이렉트
    // 여기서는 간단히 URL 파라미터로 전달 (실제 프로덕션에서는 세션/JWT 사용 권장)
    const kakaoUser = {
      id: userData.id,
      email: userData.kakao_account?.email || "",
      nickname: userData.kakao_account?.profile?.nickname || userData.properties?.nickname || "",
      profileImage: userData.kakao_account?.profile?.profile_image_url || userData.properties?.profile_image || "",
    };

    // 클라이언트에서 처리하도록 리다이렉트
    const redirectUrl = new URL("/auth/kakao/success", request.url);
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(kakaoUser)));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Kakao login error:", error);
    return NextResponse.redirect(
      new URL("/login?error=kakao_login_failed", request.url)
    );
  }
}
