# PG 대시보드 과제

Vite + React + TypeScript 기반의 대시보드 구현 프로젝트입니다.

## Tech Stack
- **React with TypeScript**
- **Build Tool**: Vite
- **Node.js**: v20.19.5
- **Styling**: Tailwind CSS
- **Charts**: Recharts (대시보드 지표 시각화)
- **UI Components**: Tailwind 기반 커스텀 컴포넌트 중심, 필요한 부분에 한해 최소한의 라이브러리만 사용

## Features
- PG 도메인의 거래/정산 데이터를 시각화하는 대시보드 구현
- 주요 지표 차트 제공
- 거래내역 리스트 페이지 제공
- 가맹점 상세 정보 페이지 제공

## Recharts 라이브러리 사용 내역
사용한 라이브러리

Recharts
패키지명: recharts
출처: https://recharts.org/

### 사용한 목적
PG 대시보드의 핵심 지표(가맹점 통계, 결제 데이터 분포 등)를 시각적으로 직관적으로 보여주기 위해
BarChart, PieChart, ResponsiveContainer 등 Recharts 컴포넌트를 사용했습니다.

### 그대로 사용한 부분
- 기본 제공되는 BarChart, PieChart, XAxis, YAxis, Tooltip, Legend 컴포넌트
- ResponsiveContainer를 통해 차트의 반응형 레이아웃 구현

Cell을 사용한 PieChart 색상 매핑

### 커스터마이징한 부분
- 공통코드(API)에서 받아온 결제수단·결제상태·가맹점상태를 Context에 저장하고
차트 범례(label)와 Tooltip 표기를 한국어로 매핑해 표시
- 차트 데이터는 실제 API 응답을 기반으로 직접 전처리(aggregateAmountsByPayType, buildBizTypeCountData)
- Tailwind 기반 카드 UI와 조합될 수 있도록 차트의 사이즈 및 여백 커스터마이징
- Tooltip formatter, Legend formatter를 오버라이드해서
숫자 포맷(금액/건수) 및 한국어 라벨을 표시하도록 수정


## 디자인 의도 및 UI/UX 포인트
- 필요한 정보만 단순하게 보여주는 대시보드 구성을 목표로 했습니다.
- 거래·가맹점 관련 데이터가 한눈에 들어오는 형태로, 카드형 레이아웃과 시각적 대비를 활용했습니다.
- Tailwind CSS를 기반으로 일관된 spacing·color·radius 시스템을 적용하여
전체 페이지가 통일된 톤앤매너를 유지하도록 구성했습니다.
- Recharts와 카드 UI를 조합할 때, 차트의 레이블·범례를 공통코드 한국어 매핑을 통해
실제 사용자가 이해하기 쉬운 형태로 표시하는 데 집중했습니다.
