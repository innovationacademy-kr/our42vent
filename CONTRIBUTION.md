# Coding Standard

우리42벤트 프로젝트는 아래의 코딩 스타일 가이드를 따릅니다.

- HTML & CSS
    
    [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
    
    [google_style_guide_ko.pdf](CONTRIBUTION%20md%20d74ea19b520c4640bcedd80bbde6f317/google_style_guide_ko.pdf)
    
- JavaScript
    
    [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
    
    [Airbnb JavaScript Style Guide (한글)](https://github.com/tipjs/javascript-style-guide)
    
- 주석은 한글로 작성합니다.

# Git Branch Convention

- git flow 사용
- 브랜치 설명
    - `main` : 서비스 출시 브랜치
    - `develop` : 다음 출시 버전 개발 브랜치
    - `feature` : 기능 개발 브랜치, `feature/(기능)` 형식으로 브랜치명 작성 (e.g. login 기능 개발 목적이면 `feature/login`)
    - `release` : 출시 버전 준비 브랜치
    - `hotfix` : 출시 버전 버그 수정 브랜치
- Reference
    
    [우린 Git-flow를 사용하고 있어요 | 우아한형제들 기술블로그](https://techblog.woowahan.com/2553/)
    

# Commit Convention

- 한글로 작성

### Commit Template

```java
# <타입>: <이슈번호><제목>

##### 제목은 이슈 번호와 함께 최대 50 글자까지 한 줄로 입력 ############## -> |

# 본문은 위에 작성
######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

# --- COMMIT END ---
# <타입> 리스트
#   (gitmoji) feat    : 기능 (새로운 기능)
#   (gitmoji) fix     : 버그 (버그 수정)
#   (gitmoji) refactor: 리팩토링
#   (gitmoji) style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   (gitmoji) docs    : 문서 (문서 추가, 수정, 삭제)
#   (gitmoji) test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   (gitmoji) chore   : 기타 변경사항 (빌드 스크립트 수정 등)
# ------------------
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문은 한 줄을 작성하고 . 마침표를 찍어서 분리한다.
# ------------------
```
- Reference

  [커밋 템플릿 · innovationacademy-kr/slabs-saver Wiki](https://github.com/innovationacademy-kr/slabs-saver/wiki/%EC%BB%A4%EB%B0%8B-%ED%85%9C%ED%94%8C%EB%A6%BF)
