- **`Debounce`**는 무엇인가요?
    
    ### **Debounce는 무엇인가요?**
    
    `Debounce`는 **이벤트가 연속적으로 발생할 때, 마지막 이벤트 이후 일정 시간 동안 추가 이벤트가 없을 때만 실행**되도록 하는 기술입니다.
    
    주로 **검색어 자동완성**, **입력 폼 유효성 검사**, **윈도우 리사이징 처리** 등에 사용됩니다.
    
    ### 📌 주요 특징
    
    - **짧은 시간 동안 여러 번 호출되는 함수 실행을 지연시킴**
    - 이벤트가 연속되면 실행이 계속 미뤄짐
    - 마지막 호출만 실행됨
    
    ### 📊 예시: 검색 자동완성
    
    사용자가 키보드를 빠르게 입력할 때마다 API를 요청하는 것이 아니라, **입력을 멈추고 일정 시간(예: 300ms)이 지나야** API를 호출하도록 합니다.
    
    ```tsx
    const debouncedSearch = debounce((query) => {
      fetch(`/api/search?q=${query}`);
    }, 300);
    
    <input onChange={(e) => debouncedSearch(e.target.value)} />
    ```
    
    ### 🖼️ 시각적 흐름 (Debounce)
    
    ```
    키 입력:   A --- B --- C --------(정지)-------->
    시간(ms):  0   100   200         500
    실행:                          ✅
    ```
    
    - A, B, C가 300ms 안에 발생 → 실행되지 않음
    - 300ms 동안 입력이 없으면 마지막 입력으로 실행됨
    
- **`Throttling`**은 무엇인가요?
    
    ## **Throttling은 무엇인가요?**
    
    `Throttling`은 **일정 시간 간격으로 함수를 실행하는 기법**입니다.
    
    스크롤 이벤트, 윈도우 리사이징, 드래그 앤 드롭 등에서 **지속적으로 발생하는 이벤트를 일정 간격으로 제한**할 때 유용합니다.
    
    ### 📌 주요 특징
    
    - **이벤트가 연속 발생해도 일정 시간마다 한 번만 실행됨**
    - 이벤트 중 일부만 실행됨 (빈도 제한)
    
    ### 📊 예시: 스크롤 위치 저장
    
    스크롤 이벤트는 매우 자주 발생하므로, **500ms마다 한 번씩만 실행**되도록 제한합니다.
    
    ```tsx
    const throttledScroll = throttle(() => {
      console.log("scroll event!");
    }, 500);
    
    window.addEventListener('scroll', throttledScroll);
    ```
    
    ### 🖼️ 시각적 흐름 (Throttle)
    
    ```
    스크롤:   ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
    시간(ms): 0---100---200---300---400---500---600
    실행:    ✅              ✅             ✅
    ```
    
    - 이벤트는 계속 발생하지만, 500ms마다 한 번씩만 실행됨
- **`Debounce`** vs **`Throttling`** 요약
    
    ## 🧠 Debounce vs Throttle 요약
    
    | 항목 | Debounce | Throttle |
    | --- | --- | --- |
    | 정의 | 마지막 이벤트 이후 일정 시간 지나면 실행 | 일정 간격마다 실행 |
    | 실행 시점 | 입력이 멈춘 후 | 일정 주기로 실행 |
    | 사용 예시 | 검색어 자동완성, 입력값 검증 | 스크롤 이벤트, 마우스 이동, 리사이징 |
    | 사용자 경험 | 느긋한 트리거 | 빠르지만 제한된 빈도로 실행됨 |
- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Debounce`** 개념 정리 🍠
        
        : 짧은 시간 내에 반복해서 발생하는 이벤트를 묶어서, 가장 마지막에 발생한 이벤트를 한 번만 처리하도록 만드는 기법
        
        - 사용 예시
            - 검색어 자동완성
            : 사용자가 입력할 때마다 API 호출을 하면 불필요한 요청이 과도하게 발생합니다. 디바운스를 적용해 “입력이 멈춘 후 일정 시간(예: 300ms) 지나면 한 번만” 검색 요청을 보내면 효율적임.
            - 윈도우 리사이드 이벤트
            : 창 크기 조절이나 스크롤 이벤트는 초당 수십~수백 번 발생할 수 있습니다. 디바운스로 처리 빈도를 줄이면 렌더링 성능 개선 가능
    - **`Debounce`** 코드 작성 🍠
        
        ```tsx
        // 함수 형태
        function debounce(fn, wait) {
          let timer = null;
          return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              fn.apply(this, args);
            }, wait);
          }
        }
        
        // 사용 예시
        import { useState, useEffect, useCallback } from "react";
        
        function useDebounce(value, delay) {
          const [debounced, setDebounced] = useState(value);
        
          useEffect(() => {
            const timer = setTimeout(() => setDebounced(value), delay);
            return () => clearTimeout(timer);
          }, [value, delay]);
        
          return debounced;
        }
        
        function Search() {
          const [query, setQuery] = useState("");
          const debouncedQuery = useDebounce(query, 300);
        
          useEffect(() => {
            if (debouncedQuery) {
              // API 호출
              fetchSuggestions(debouncedQuery);
            }
          }, [debouncedQuery]);
        
          return (
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="검색어 입력..."
            />
          )
        }
        ```
        
- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Throttling`** 개념 정리 🍠
        
        : 지정한 시간 간격 동안 한 번만 함수가 실행되도록 제어하는 기법. 주로 스크롤, 윈도우 리사이즈, 마우스 무브 등 이벤트가 매우 빠르게 연속 발생할 때 과도한 호출을 막아 성능을 보호하기 위해 사용
        
    - **`Throttling`** 코드 작성 🍠
        
        ```tsx
        // 함수 형태
        
        function throttle<T extends (...args: any[]) => any>(fn: T, interval: number): T {
          let lastCall = 0;
          return function(this: any, ...args: any[]) {
            const now = Date.now();
            if (now - lastCall >= interval) {
              lastCall = now;
              fn.apply(this, args);
            }
          } as T;
        }
        
        // 사용 예시: 스크롤 이벤트 핸들러를 200ms 단위로 제한
        window.addEventListener('scroll', throttle(() => {
          console.log('스크롤 위치:', window.scrollY);
        }, 200));
        ```