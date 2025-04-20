# 🎯 AI Builder Prompt: Feenix: Amkadamiyya School Fee Management System

## 📖 The Problem Statement: Why We Need This Software

**The Current Chaos at Amkadamiyya School**

Amkadamiyya School Jalingo has been managing student fees the old-fashioned way: **spreadsheets**. Excel files scattered across desks, shared via email, updated manually, prone to errors. Here's the painful reality:

- **Lost data**: Rows deleted by accident, versions overwritten, no audit trail
- **Manual calculations**: Balancing sheets takes hours, arithmetic mistakes = angry parent
- **No visibility**: Finance staff doesn't know who owes what until end-of-term reconciliation (too late)
- **Payment chaos**: Multiple payment methods (cash, bank transfers, mobile money) logged separately, hard to reconcile
- **Paper receipts**: Printed receipts get lost; parents call asking "did you record my payment?"
- **Reports take forever**: Need a debtor list? Admin spends a day filtering and sorting
- **Communication breakdown**: School can't easily contact defaulters; guardians don't get payment reminders
- **Audit nightmare**: Zero compliance trail; difficult to verify who approved what payment

**Why This Matters**

Every day without proper system:
- Administrative staff waste 4-5 hours on manual data entry and reconciliation
- The Director can't make strategic decisions (no real-time data)
- Parents get frustrated with unclear payment statuses
- The school loses track of outstanding fees (estimated 15-20% revenue loss)
- Staff morale drops (repetitive, error-prone work)

**The Solution**

This software replaces chaos with clarity. A modern, intuitive fee management system that:
- **Centralizes data**: Single source of truth for all student payments and balances
- **Automates calculations**: Real-time balance updates, automatic receipt generation
- **Enables insights**: Dashboards show collection rates, debtor trends, class-wise analysis
- **Improves communication**: Easy contact to guardians, payment reminders, reconciliation reports
- **Ensures compliance**: Full audit trail, role-based access, secure data
- **Saves time**: Staff focuses on strategy, not spreadsheets

---

## Project Overview

Build a **production-ready React frontend** for a school fee management system that replaces Excel spreadsheets with a modern, intuitive web interface. This is for Amkadamiyya School Jalingo. Generate **ONLY React pages and reusable components**—no backend code, no Radix UI, no shadcn.

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
- Tables are permitted for high-density data (Students master table, mini debtors summary on Dashboard). Prefer card grids elsewhere.
- Skeleton loaders for all data-loading states (tables, cards, charts, modals, lists) for perceived performance.
- Skeleton loaders for all data-loading states (tables, cards, charts, modals, lists) for perceived performance.

---

## 🏗️ Tech Stack

**Required**:

- React Router v6
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

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # Reusable: Button, Card, Input, Select, Modal, Toast, Loader, SearchBar, Badge, Avatar, Skeleton
│   ├── layout/              # Sidebar, Topbar, BottomNav, MobileNav, PageHeader, NavigationGrid
│   ├── dashboard/           # MetricCard, ProgressBar, Charts, ActivityFeed
│   ├── students/            # StudentCard, StudentList, Filters, AddModal, BulkUploadModal, ProfileCard, Tabs
│   ├── payments/            # PaymentForm, Preview, Receipt, History
│   └── fees/                # FeeStructureCard, ItemRow, TemplateForm
├── pages/                   # Dashboard, Students, StudentDetails, Payments, RecordPayment, FeeStructure, Debtors, Reports, Settings
├── hooks/                   # useAuth, useStudents, usePayments, useFeeStructure
├── utils/                   # formatCurrency, formatDate, calculateBalance, exportHelpers
└── context/                 # AuthContext, AppContext
```

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

**Layout**:

- 4 metric cards (Total Students, Expected Fees, Paid, Outstanding) with icons, large numbers, trend indicators
- Progress bar showing collection percentage (green to red gradient)
- 2 charts: Bar chart (collections by class), Line chart (payment trend 30 days)
- Recent activity feed (scrollable, last 10 payments)
- Floating action button (bottom-right): expands to show "Record Payment", "Add Student", "View Debtors"
- Debtors Summary: compact card-like table (top or right column) showing top N debtors (name, class/category color chip, amount owed, days overdue, tel icon). Each row clickable; guardian phone uses `href="tel:"`.

**Animations**: Page fade-in, stagger metric cards, hover lift on cards, chart data transitions

---

### 2. Students Page (`/students`)

**Header KPI Cards**:

- Total Students, New This Term, Total Outstanding, Collection Rate (use category color accents where relevant).

**Filters Bar**:

- Search (name/admission no), Class (multi-select with category color chips), Payment Status, Term, Fee Category, Admission Year, Balance Range (min/max), Guardian Phone search. Clear All button.

**Students Table** (primary data view):

- Columns: Avatar, Name, Admission No, Class (color chip via category vars), Fee Category, Outstanding Balance (color-coded threshold), Payment Status badge, Last Payment (date), Guardian Phone (tel link), Actions (View, Record Payment).
- Features: Sticky header, responsive collapse to card stack on mobile, row hover highlight, inline quick actions.
- Sorting: Name, Class, Balance, Last Payment.
- Bulk select (checkbox) for batch operations (e.g., export, assign fee category).

**Secondary Card Grid (optional toggle)**:

- Alternative visual representation; user can switch between Table and Grid view.

**Modals**:

- Add Student Modal (grid inputs as previously defined, ensure category selection with color preview).
- Bulk Upload Modal (unchanged flow; include mapping for category/class).

**Empty state**: Icon + "No students found" message (contextual to active filters) + Reset Filters button.

**Accessibility & Interactions**:

- Guardian phone numbers use `href="tel:"` links; phone icon before number.
- Table rows keyboard focusable.

**Animations**: KPI cards stagger, table fade-in, row hover lift (subtle), modal transitions.

---

### 3. Student Details Page (`/students/:id`)

**New dedicated route** with:

- Hero card: Large avatar, name, admission no, class, age, current balance (prominent, color-coded), action buttons
- Quick info grid: 4 cards showing join date, current class, guardian, contact (all with icons)
- Tabbed content: Overview, Payment History (timeline), Invoices (cards), Academic Record, Notes
- Action menu (⋮): Print summary, export history, mark indigent, archive, delete (super admin only with type-to-confirm modal)

**Overview tab**: Personal info, guardian info, academic status (grid of icon+value, no labels)

**Payment History tab**: Vertical timeline (not table), each payment as bubble with amount, date, method, receipt download

**Invoices tab**: Cards showing term invoices with breakdown, total, paid, balance, status badge

**Animations**: Hero fade-in, tab content transitions

---

### 4. Add Student

**Two options**:

#### A. Single Student Modal

- Grid form layout, **no labels—only icons inside inputs**
- Sections: Personal (name, DOB, gender, admission no, class), Guardian (name, phone, email, relationship, address), Fee Category
- Placeholders describe fields
- Real-time validation with errors below inputs
- Save button with loading state

#### B. Bulk Upload Modal

- **3 steps**: Upload file (drag-drop zone, accept .xlsx/.xls/.csv), Map columns (dropdowns to match Excel columns to system fields with auto-detect), Review & import (show summary, errors, progress bar)
- Download template link (pre-formatted Excel with sample data)
- Success screen with confetti animation

**Template columns**: Full Name, Admission Number, DOB, Gender, Class, Guardian Name, Guardian Phone, Guardian Email, Address, Fee Category

**Animations**: Modal scale-in, step transitions, confetti on success

---

### 5. Fee Structure Page (`/fee-structure`)

**Grid** of fee template cards (3-col):

- Each card: Class name, session/term, list of fee items with icons and amounts, total (large), student count, action buttons (Edit, Duplicate, Apply)
- Action menu: Edit structure, duplicate for next term, view applied students, delete (super admin, with confirmation)

**Create/Edit modal**:

- Select session, term, class
- Dynamic fee item rows: icon selector, item name, amount, delete row button
- "Add Fee Item" button
- Auto-calculated total display
- Save options: "Save as Draft", "Save & Apply to Students" (shows confirmation with student count)

**Duplicate feature**: Pre-fills data, adjust term/session, option for percentage increase across all items

**Animations**: Card stagger, total updates smoothly

---

### 6. Record Payment Page (`/payments/record`)

**Layout**: Centered form with progress steps indicator (Select Student → Enter Amount → Confirm)

**Step 1**: Autocomplete search dropdown with student cards showing avatar, name, admission no, class, balance

**Step 2**: Selected student card at top (highlighted), payment form below:

- Amount paid input (₦ prefix, "Pay Full Amount" link)
- Date picker (defaults today, "Use today" button)
- Payment method dropdown (icons change based on selection)
- Reference number (conditional, shows for bank/POS/online)
- Notes textarea

**Step 3**: Preview card with summary (student, previous balance, amount paid, new balance, method, date), back button, submit button

**On success**: Checkmark animation, receipt preview card with print/download/WhatsApp buttons, "Record Another Payment" button

**Animations**: Step transitions, success checkmark draw, receipt slide-in

---

### 7. Debtors Page (`/debtors`)

**Top**: 3 summary cards (total debtors, total debt, average debt) with trend indicators

**Filters**: Search (name/admission no), Minimum debt slider (live), Class multi-select (category color chips), Fee Category, Payment Status (e.g., Partial, Overdue), Last Payment Range (date picker), Term, Session, Sort dropdown (Highest Debt, Lowest Debt, Name, Class, Days Overdue). Clear All button.

**Grid** (2-col): Debtor cards with:

- Avatar, name, class, admission no, amount owed (large, red/amber), last payment date, days overdue badge
- Guardian name + phone (clickable tel link `href="tel:+234..."`) with phone icon
- Action buttons: "Call Guardian", "Record Payment"
- Alert badge severity by debt amount

**Export section**: Dropdown with PDF/Excel/Email options, preview modal before export

**Empty state** (no debtors): Celebration icon, "No Outstanding Debts! 🎉", green background

**Animations**: Card stagger, hover lift

---

### 8. Reports Page (`/reports`)

**Layout**: Sidebar navigation (left) + content area (right)

**Sidebar menu**:

- Term Summary (default)
- Monthly Collections
- Class Performance
- Payment Methods
- Indigent Students
- Custom Report

**Content area controls**: Report title, date range picker (quick options: This Term, This Month, Last Month, Custom), Generate button, Export buttons (PDF, Excel, Print)

**Term Summary Report**:

- 4 overview cards (expected, collected, outstanding, collection rate)
- 2 charts: Collections by class (horizontal bar), Payment timeline (area chart)
- Accordion sections: By Class (expandable with details), By Payment Method (pie chart), Top Contributors (leaderboard with medals)

**Monthly Collections Report**:

- Line chart (monthly trend with previous session comparison)
- Minimal table with color-coded percentages
- Daily collection heatmap (calendar view with color intensity)

**Payment Methods Report**:

- Donut chart with method stats cards around it
- Trend line chart (method usage over time)
- Toggle between amounts and percentages

**Custom Report Builder**:

- Select metrics (multi-checkboxes), filters (collapsible sections), group by (radio), visualization type (bar/line/pie/table/cards)
- Live preview, save template option
- Saved templates appear in sidebar

**Animations**: Chart data transitions, tab content fade, accordion expand/collapse

---

### 9. Settings Page (`/settings`)

**Tabs**: General, Academic Sessions, Fee Categories, Users (super admin only), System (super admin only)

**General Tab**: School info card (name, address, phone, email, logo upload), currency/format preferences, notification settings (checkboxes), receipt settings

**Academic Sessions Tab**: Current session card (highlighted, shows 3 terms with status), previous sessions (accordion), add new session button, set active term dropdown

**Fee Categories Tab**: List of category cards (Regular, Indigent, Scholarship) showing student count, percentage, requires approval toggle, edit/delete buttons. Add category button.

**Users Tab** (super admin): User cards with avatar, name, email, role badge, last login, status dot, action buttons (edit, deactivate, reset password). Add user button. Role comparison table (collapsible). Activity log viewer (timeline of user actions).

**System Tab** (super admin): Database backup card (last backup, schedule, backup now), data management (export all, archive old records), audit trail (full log viewer), danger zone (red border, destructive actions with confirmations)

**Animations**: Tab transitions, toggle switches, accordion expand

---

## 🎨 Reusable Components (Key Props)

### Button

**Variants**: primary (brand), secondary (light), ghost (transparent), danger (red), success (brand dark)  
**Sizes**: small, medium, large  
**States**: hover, active, disabled, loading (spinner)  
**Props**: icon (left/right/only), full-width option  
**Animations**: Scale on tap, lift on hover

### Card

**Variants**: default, highlighted (green left border), warning (amber), danger (red), hoverable  
**Props**: title, icon, action (top-right button/link), footer  
**Animations**: Fade-in with slide up, lift on hover (if hoverable)

### Input

**Base**: 44px height, 8px radius, icons inside (left), focus brand ring  
**Types**: text, number (₦ prefix for currency), date (picker), email, phone, password (toggle show/hide)  
**States**: default, focus, error (red border, message below), disabled, success (green border, checkmark)  
**No labels**: Use descriptive placeholders + icons

### Modal

**Structure**: Backdrop (blur + fade), container (centered, sizes: small/medium/large/full), close X button, header (title + icon), scrollable body, footer (buttons right-aligned)  
**Close Behavior**: Modal closes on backdrop click-away, ESC key, or close button.
**Animations**: Backdrop fade, modal scale-in from 0.95, exit reverse  
**Accessibility**: Focus trap, ESC to close, backdrop click to close, scroll lock on body

### Badge

**Variants**: success (brand), warning (amber), danger (red), info (blue), neutral (gray), category (nursery, primary, junior, senior using `--cat-*` vars)  
**Sizes**: small, medium, large  
**Props**: icon (left/right), uppercase option

### SearchBar

**Features**: Search icon (left), input, clear X button (shows when typing), loading spinner (when searching)  
**Style**: Full/fixed width, 44px height, focus green ring  
**Functionality**: Debounced input (300ms), keyboard shortcut (CMD/CTRL+K to focus)  
**Animations**: Clear button fade + rotate, loader spin

### Toast

**Types**: success (green, check icon), error (red, X icon), warning (amber, exclamation), info (blue, info icon)  
**Position**: Top-right, stacked  
**Structure**: Icon, message, optional description, close X  
**Auto-dismiss**: 5s (customizable)  
**Animations**: Slide from right + fade, stagger multiple

### Loader

**Variants**: spinner (rotating), dots (bouncing), bar (progress), skeleton (content placeholders for cards, tables, charts, modals)  
**Sizes**: small, medium, large  
**Colors**: primary (brand), secondary (gray), category variants (nursery, primary, junior, senior)
**Skeleton Details**: Animated pulse, match layout of target component (e.g., card skeleton, table row skeleton, chart skeleton)

### Table

**Usage**: Students master list, Dashboard debtors summary, other dense data needs.
**Features**: Responsive (collapses to cards on <640px), sortable headers, optional row selection, sticky header, empty state slot.
**Styling**: Use CSS variables; header background `--secondary`, hover row background `--secondary` at 30% opacity, focus outline with `--primary`.
**Accessibility**: `role="table"` with proper `th` scope; rows keyboard focusable; phone numbers inside cells use `href="tel:"`.
**Animations**: Initial fade + slight upward slide; row hover subtle scale (1.01); skeleton loading for first render.
**Full-page option**: Centered with backdrop

### BottomNav (Mobile)

**Visibility**: Only on SM screens (<1024px).
**Structure**: Fixed bar at bottom (safe area padding for notch devices), 4 items: 3 primary routes + 1 "More" button.
**Primary items**: Dashboard, Students, Payments (adjust based on most-used flows).
**Items**: Icons only (no labels due to space), active state highlights with brand color (`--primary`), inactive state uses `--gray`.
**More button**: Icon (e.g., three-dots or ellipsis), taps to navigate to `/nav` (Navigation Page).
**Styling**: Background `--white`, border-top `--secondary`, safe spacing for mobile (44-56px height).
**Animations**: Icon highlight pulse on navigation, smooth active state transitions.
**Accessibility**: Proper ARIA labels ("Dashboard", "Students", etc.), keyboard navigation via Tab.

### Sidebar (Desktop)

**Visibility**: Only on LG screens (≥1024px).
**Structure**: Vertical sidebar (collapsible), fixed or sticky, shows all navigation items with icons + labels.
**Collapsed state**: Icons only (minimal width ~64px); hover shows tooltip labels.
**Expanded state**: Icons + labels (width ~240px), smooth animated transition.
**Logo/branding**: Top of sidebar.
**Active indicator**: Left border highlight with brand color.
**Styling**: Background `--secondary`, use category colors for grouping (e.g., Settings in purple).
**Animations**: Collapse/expand smooth width transition, item hover lift + background color shift.

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

**General principles**:

- Spring physics for natural feel
- 0.3s duration for most transitions
- Stagger children with 0.05s delay
- Hover: subtle lift + scale (1.02)
- Tap: scale down (0.98)
- Exits: reverse of entry animations

---

## 📱 Responsive Design

**Breakpoints**: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)

**Navigation Strategy**:

- **SM screens (<1024px)**: Bottom navigation bar with 3 primary items (Dashboard, Students, Payments) + 1 "More" button. "More" navigates to dedicated mobile-only Navigation Page (`/nav`) with grid layout showing all remaining routes (Debtors, Fee Structure, Reports, Settings, etc.) with icons, labels, and category color accents. Bottom nav remains visible on this page for quick return.
- **LG screens (≥1024px)**: Premium sidebar (collapsible, shows icons + labels when expanded) with all navigation items, persistent across pages. Topbar for global actions and user profile.

**Key adaptations**:

- Metric cards: 1-col mobile, 2-col tablet, 4-col desktop
- Student grid: 1-col mobile, 2-col tablet, 3-col desktop
- Forms: Single-col mobile, multi-col desktop
- Tables: Card layout mobile, table desktop
- Modals: Full-screen mobile, centered tablet/desktop

**Touch-friendly**: 44px minimum tap targets, 64px navigation items on mobile

---

## 🔒 Security & Validation

**Form validation** (React Hook Form):

- Real-time validation on blur
- Error messages below inputs (red)
- Required fields, email format, phone format, date ranges, unique admission numbers, amount validations

**Role-based rendering**: Conditionally show features based on user role

**Confirmation modals**: All destructive actions, large payments, bulk operations, type-to-confirm for critical actions
**Phone Links**: All guardian/user phone numbers rendered with `href="tel:"` for immediate calling on mobile devices; include visually hidden text for screen readers ("Call guardian").

---

## 📊 Utilities

**Formatters**: `formatCurrency(amount)`, `formatDate(date, format)`, `formatNumber(num)`, `formatPercent(decimal)`, `getInitials(name)`, `capitalizeWords(text)`

---

## 🎯 Key User Flows

1. **Record Payment**: Dashboard → Record Payment cmdbutton → Search student → Enter amount/method → Submit → Receipt
2. **Add Student**: Students → Add button → Fill form (grid, icons, no labels) → Save → Success toast
3. **Bulk Upload**: Students → Bulk Upload → Download template → Fill Excel → Upload → Map columns → Review → Import → Confetti
4. **View Debtors**: Debtors page → Filter by class/amount → Call guardian or record payment → Export PDF report
5. **Configure Fees**: Fee Structure → Create new → Select session/term/class → Add items → Save & apply → Generate invoices

---

## ✅ Final Requirements

- Production-ready code with proper error handling.
- Fully responsive (mobile-first)
- Smooth Framer Motion animations throughout
- Heroicons for all icons (no other icon libraries)
- Clean, reusable components
- TypeScript optional but encouraged
- Tailwind config with custom color palette
- Mock API integration ready (Axios setup with base URL)
- Comments for complex logic
- Accessible (ARIA labels, keyboard navigation, focus management)

**Build a modern, intuitive interface that makes fee management feel effortless.**
