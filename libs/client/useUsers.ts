import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function useUser() {
  // fetch를 이용하여 매번 요청을 한다면 부담이 감 그래서 SWR을 사용
  // useSWR을 캐싱 시스템을 사용
  const { data, error } = useSWR('/api/users/me');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      // router.push()는 기록을 남김(뒤로 가기 가능)
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
