# 🎯 AI Builder Prompt: Feenix: Amkadamiyya School Fee Management System

## 📖 The Problem & Solution

**Problem**: Amkadamiyya School manages fees via scattered, error-prone Excel spreadsheets—lost data, manual calculations, no visibility, payment chaos, zero audit trail. Result: 4-5 hrs daily admin waste, 15-20% revenue loss, staff frustration.

**Solution**: Centralized, automated fee system with real-time balances, instant receipts, actionable dashboards, guardian communication, full compliance audit trail, and reclaimed staff time.

---

## Project Overview

Build a **production-ready React (Typescript) frontend** for a school fee management system that replaces Excel spreadsheets with a modern, intuitive web interface. This is for Amkadamiyya School Jalingo. Generate **ONLY React pages and reusable components**—no backend code, no database integration, use Radix UI.

---

## 🎨 Design System

### Color Palette

Use the following CSS variables as the single source of truth for colors across the app:

```css
:root {
    --primary: #5f81c2;
    --secondary: #e2ecfe;
    --white: #e7ebf9;
    --black: #080e18;
    --gray: #c1c4cb;
    --bg-body: #f2f3f6;
    /* School Category Colors */
    --cat-nursery: #4d7ae8; /* blue */
    --cat-primary: #8b5cf6; /* purple */
    --cat-junior: #ea5cbf; /* magenta/pink */
    --cat-senior: #f59e0b; /* amber */
}
```

- Primary: brand color (`--primary`)
- Secondary: light variant (`--secondary`)
- Neutrals: `--white`, `--black`, `--gray`

All UI components, utilities, and charts should reference these variables directly (or via Tailwind tokens mapped to them) instead of hardcoded hex values.

### Typography

- **Font**: Figtree
- **Headings**: 600-700 weight, navy color
- **Body**: 400-500 weight, gray color
- **Currency/Numbers**: 600 weight, larger sizing

### Visual Style

- Clean cards with 12px radius, multi-layered subtle shadows
- Icons everywhere (input fields, cards, etc): Heroicons
- Generous spacing (24-32px padding)
- Currency format: ₦ (Naira symbol)
- Smooth Framer Motion animations throughout
- Tables for dense data (Students table, debtors summary); prefer card grids elsewhere
- Skeleton loaders for all data-loading states (perceived performance)
- Use gradient blurry blobs for the backgrounds using our design system.

---

## 🏗️ Tech Stack

**Required**:

- React Router + Typescript
- Tailwind CSS (custom config with above palette)
- **Heroicons** (all icons)
- **Framer Motion** (all animations)
- Recharts (dashboard analytics)
- React Hook Form (validation)
- Axios (API calls)
- date-fns (dates)

---

## 👥 User Roles

### Super Admin (Director)

- Full access including **delete students** (ONLY role that can delete)
- Manage users, system settings, fee structures

### Admin

- Add/edit students (no delete)
- Record payments, configure fees, view reports

### Accountant

- Record payments, view students, print receipts, basic reports
- No delete, no settings, no user management

**Role-based UI**: Hide restricted features for non-admins.

---

---

## 🧭 Navigation Pages

### Mobile Navigation Page (`/nav`)

**Visibility**: Only on SM screens (<1024px), accessible via "More" button in bottom nav.

**Layout**:

- Header: "More" or "Navigation" title with back/close button (or use breadcrumb)
- Grid layout (2-3 col on mobile, responsive) of navigation cards showing all routes not in bottom nav: Debtors, Fee Structure, Reports, Settings, etc.
- Each card: Icon (from Heroicons), label, optional description, color accent via category or purpose
- Bottom nav remains visible and sticky for quick navigation back
- Smooth scroll and card stagger animations on load

**Interactions**: Tap card to navigate to route; maintain scroll position on return via router cache.

---

## 📊 Core Pages (Overview)

### 1. Dashboard (`/dashboard`)

**Layout**: 4 metric cards (Total, Expected, Paid, Outstanding) with trends; progress bar (%); 2 charts (by class, 30-day); activity feed; FAB (Record, Add, View Debtors); debtors mini-table with tel links.\n\n**Animations**: Fade-in, stagger, chart transitions.

---

### 2. Students Page (`/students`)

**Header**: 4 KPI cards (Total Students, New This Term, Outstanding, Collection Rate).

**Filters**: Search, Class (multi-select), Payment Status, Term, Fee Category, Balance Range, Guardian Phone. Clear All button.

**Table**: Avatar, Name, Admission No, Class (color chip), Fee Category, Balance, Payment Status, Last Payment, Guardian Phone (tel link), Actions. Sticky header, sortable, row selection, responsive collapse on mobile.

**View Toggle**: Table ↔ Card Grid.

**Modals**: Add Student (grid, category selection), Bulk Upload (file → map columns → review).

**Empty state**: Icon + message + Reset Filters.

**Accessibility**: Phone numbers as tel links, rows keyboard focusable.

**Animations**: KPI stagger, table fade, row hover.

---

### 3. Student Details Page (`/students/:id`)

**Hero**: Avatar, name, admission no, class, age, balance (color-coded).

**Info Grid**: 4 cards (join date, class, guardian, contact).

**Tabs**: Overview, Payment History (timeline), Invoices, Academic Record, Notes.

**Actions**: Print, export, mark indigent, archive, delete (super admin + confirm).

**Animations**: Hero fade, tab transitions.

---

### 4. Add Student

**Single Modal**: Grid form (Personal, Guardian, Fee Category sections). Icons in inputs, placeholders describe. Validation on blur. Save with loading state.

**Bulk Upload**: 3 steps (file upload → map columns → review). Download template link. Confetti on success.

**Template Columns**: Full Name, Admission Number, DOB, Gender, Class, Guardian Name, Phone, Email, Address, Fee Category.

**Animations**: Modal scale-in, step transitions, confetti.

---

### 5. Fee Structure Page (`/fee-structure`)

**Grid**: 3-col cards per template (class, session/term, fee items, total, student count, actions).

**Actions**: Edit, Duplicate (pre-fills, adjust term/session, optional % increase), Apply, Delete (super admin).

**Create/Edit Modal**: Session, term, class; dynamic fee rows (icon, name, amount); Add Fee Item button; auto-calculated total; Save as Draft or Save & Apply.\n\n**Animations**: Card stagger, total updates smoothly.

---

### 6. Record Payment Page (`/payments/record`)

**Steps**: Select Student → Enter Amount → Confirm.

**Step 1**: Autocomplete search (student cards: avatar, name, admission no, class, balance).

**Step 2**: Selected student card (highlighted); form: Amount (₦ prefix, "Pay Full" link), Date (defaults today), Method (dropdown), Reference (conditional), Notes.

**Step 3**: Preview (summary), Submit.\n\n**Success**: Checkmark, receipt card (Print/Download/WhatsApp buttons), "Record Another" button.

**Animations**: Step transitions, checkmark draw, receipt slide-in.

---

### 7. Debtors Page (`/debtors`)

**Summary**: 3 cards (total debtors, total debt, average debt) with trend indicators.

**Filters**: Search, Min Debt (slider), Class (multi-select), Fee Category, Payment Status, Last Payment Range, Sort. Clear All button.

**Cards** (2-col): Avatar, name, class, amount owed (large), days overdue, last payment.

- Guardian phone (tel link with icon)
- Actions: Call Guardian, Record Payment

**Export**: PDF/Excel/Email with preview modal.

**Empty state**: Celebration icon + message.

**Animations**: Card stagger, hover lift.

---

### 8. Reports Page (`/reports`)

**Sidebar menu**: Term Summary, Monthly Collections, Class Performance, Payment Methods, Indigent Students, Custom Report.

**Controls**: Date range picker, Generate, Export (PDF/Excel/Print).

**Term Summary**: 4 cards, 2 charts (collections by class, 30-day trend), accordions (by class, method, top contributors).

**Monthly Collections**: Line chart, table, heatmap.

**Payment Methods**: Donut chart + cards, trend line, amounts/percentages toggle.

**Custom Builder**: Select metrics, filters, group by, visualization type, live preview, save template.

**Animations**: Chart transitions, accordion expand/collapse.

---

### 9. Settings Page (`/settings`)

**Tabs**: General, Academic Sessions, Fee Categories, Users (super admin), System (super admin).

**General**: School info (name, address, phone, email, logo), currency/format, notifications, receipt settings.

**Academic Sessions**: Current session card (3 terms), previous sessions (accordion), add button, set active term.

**Fee Categories**: Category cards (Regular, Indigent, Scholarship) with count, %, approval toggle, edit/delete, add button.

**Users** (super admin): User cards (avatar, name, email, role, last login, actions), add button, role comparison (collapsible), activity log.

**System** (super admin): Database backup, data export/archive, audit trail, danger zone (destructive + confirms).

**Animations**: Tab transitions, toggle switches, accordion expand.

---


## 🎬 Animation Strategy

**Use Framer Motion for**:

- Page transitions (fade + slide)
- List/grid stagger (children delay)
- Card hover effects (lift + shadow)
- Modal/drawer animations (scale + backdrop fade)
- Button interactions (tap scale, hover lift)
- Success states (checkmark draw, confetti explosion)
- Loading states (spinner rotation, skeleton pulse)
- Form elements (input focus ring, error shake)
- Tab/accordion transitions
- Chart data updates
- Toast notifications (slide + fade)

## 📱 Responsive Design

**Breakpoints**: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)

**Navigation Strategy**:

- **SM screens (<1024px)**: Bottom navigation bar with 3 primary items (Dashboard, Students, Payments) + 1 "More" button. "More" navigates to dedicated mobile-only Navigation Page (`/nav`) with grid layout showing all remaining routes (Debtors, Fee Structure, Reports, Settings, etc.) with icons, labels, and category color accents. Bottom nav remains visible on this page for quick return.
- **LG screens (≥1024px)**: Premium sidebar (collapsible, shows icons + labels when expanded) with all navigation items, persistent across pages. Topbar for global actions and user profile.


## 🔒 Security & Validation

**Form validation**: Real-time blur validation, errors below inputs.
**Validators**: Required fields, email, phone, date ranges, unique admission numbers, amounts.
**Confirmations**: Destructive actions, large payments, bulk ops, type-to-confirm for critical actions.
**Phone Links**: All phone numbers as `href="tel:"` with ARIA labels.

---

## 📊 Utilities

**Formatters**: `formatCurrency()`, `formatDate()`, `formatNumber()`, `formatPercent()`, `getInitials()`, `capitalizeWords()`.

---

## 🎯 Key User Flows

1. **Record Payment**: Dashboard → Record button → Search student → Amount/Method → Submit → Receipt.
2. **Add Student**: Students → Add → Form → Save → Toast.
3. **Bulk Upload**: Students → Bulk → File → Map → Review → Import → Confetti.
4. **View Debtors**: Debtors → Filter → Call or Record → Export.
5. **Configure Fees**: Fee Structure → Create → Session/Term/Class → Items → Save/Apply.

---

## ✅ Final Requirements

- Production-ready, error handling
- Fully responsive (mobile-first)
- Smooth Framer Motion animations
- Heroicons only
- Clean reusable components
- TypeScript
- Tailwind with custom palette
- Mock API ready (Axios)
- Comments for complex logic
- Accessible (ARIA, keyboard nav, focus mgmt)

**Build an premium, production-ready, super intuitive interface that makes fee management effortless.**
