# Product Requirements Document (PRD)
## MediCitas — Patient Medical Appointment Portal

**Document Version:** 1.0  
**Last Updated:** August 2026  
**Status:** Active Development

---

## 1. Executive Summary

**MediCitas** is a patient-facing medical appointment portal that enables patients to manage their healthcare appointments efficiently. The application provides a simple, intuitive interface for patient authentication, appointment viewing, and booking new consultations with available doctors.

**Key Objective:** Deliver a responsive, user-friendly SPA that streamlines the patient appointment management process, reducing administrative burden on medical staff and improving patient satisfaction.

**Target Launch:** MVP ready for internal testing and integration with backend services.

---

## 2. Product Vision

### Vision Statement
Empower patients with a modern, accessible platform to take control of their medical care by easily scheduling, tracking, and managing appointments anytime, anywhere.

### Mission
Provide a seamless, intuitive appointment management experience that bridges patients and healthcare providers, reducing no-shows and improving clinic efficiency.

---

## 3. Target Users

### Primary Users
- **Patients (18-75 years old)**: Individuals seeking medical care who need to schedule and manage appointments
  - Tech-savvy patients who prefer digital self-service
  - Patients with regular medical needs (follow-ups, chronic condition management)
  - Patients on multiple devices (desktop, mobile, tablet)

### Secondary Users
- **Administrative Staff (clinic/hospital)**: Monitor patient appointments and support critical functions
- **Healthcare Providers (doctors/nurses)**: View their scheduled appointments
- **System Administrators**: Manage user accounts and appointment data

### User Personas

#### Persona 1: María (Primary Patient)
- **Age:** 34, employed professional
- **Tech Proficiency:** High
- **Needs:** Quick, intuitive scheduling; mobile access; appointment reminders
- **Pain Points:** Long wait times on phone, inflexible scheduling hours

#### Persona 2: Pedro (Secondary Patient)
- **Age:** 68, retired
- **Tech Proficiency:** Medium
- **Needs:** Simple interface, clear instructions, large text/buttons
- **Pain Points:** Difficulty using complex systems, prefers human interaction

---

## 4. Main Features (MVP)

### 4.1 Authentication & Authorization
- **User Login:** Email and password-based authentication
- **Session Management:** Secure token-based session handling
- **Logout Functionality:** Clear session data from browser storage
- **Demo Credentials:** Pre-configured test account for demo purposes
- **Protected Routes:** Authentication guard for dashboard and appointment pages

### 4.2 Patient Dashboard
- **Welcome Header:** Personalized greeting with patient name and email
- **Appointment Statistics Cards:**
  - Total appointments
  - Pending appointments
  - Confirmed appointments
  - Completed appointments
- **Responsive Layout:** Adapts to desktop (2-column) and mobile (1-column) views

### 4.3 Appointment Management
- **View Appointments List:**
  - Display all patient appointments with key details
  - Visual status badges (Pending, Confirmed, Completed, Cancelled)
  - Chronological ordering (upcoming first)
  - Empty state handling with supportive messaging

- **Next Appointment Card:**
  - Prominently display the next scheduled appointment
  - Show doctor name, specialty, date/time, and current status
  - Quick access to key information

- **Appointment Details:**
  - Doctor name and medical specialty
  - Appointment date and time
  - Visit reason/chief complaint
  - Current status with visual indicator
  - Optional: Appointment location/room

### 4.4 Create New Appointment
- **Appointment Booking Form:**
  - Select available doctor from dropdown
  - Choose appointment date (calendar picker)
  - Select time slot
  - Enter reason for visit/chief complaint
  - Form validation with error messages
  - Success confirmation with appointment details

### 4.5 User Experience
- **Loading States:** Spinners and loading indicators during data fetches
- **Empty States:** Friendly messaging when no data is available
- **Error Handling:** Informative error messages for failed operations
- **Accessibility:** WCAG 2.1 AA compliant (semantic HTML, ARIA labels, keyboard navigation)

---

## 5. User Stories & Use Cases

### 5.1 User Story: Patient Login
```
As a patient
I want to log in with my email and password
So that I can securely access my appointment information
```

**Acceptance Criteria:**
- [ ] Login form accepts email and password inputs
- [ ] Valid credentials redirect to dashboard
- [ ] Invalid credentials show error message
- [ ] Password field masks input for security
- [ ] Demo credentials button populates test account
- [ ] Session persists across page refreshes

### 5.2 User Story: View Appointments
```
As a patient
I want to see all my appointments in one place
So that I can track my medical schedule at a glance
```

**Acceptance Criteria:**
- [ ] All appointments display in a list with clear formatting
- [ ] Status badges indicate appointment state (pending, confirmed, etc.)
- [ ] Upcoming appointments appear at the top
- [ ] Loading spinner shows while fetching data
- [ ] Empty state shown if no appointments exist
- [ ] List is sortable by date (optional enhancement)

### 5.3 User Story: Book New Appointment
```
As a patient
I want to book a new appointment with a doctor
So that I can schedule medical care when I need it
```

**Acceptance Criteria:**
- [ ] Form displays available doctors in dropdown
- [ ] Date picker prevents selecting past dates
- [ ] Time slots are available and validated
- [ ] Reason field is required and supports multi-line input
- [ ] Form validation shows errors before submission
- [ ] Successful booking shows confirmation message
- [ ] New appointment appears in the appointment list immediately

### 5.4 Use Case: Patient Dashboard Overview
```
Given a logged-in patient
When I view the dashboard
Then I see:
  - A personalized greeting
  - Statistics cards showing appointment counts by status
  - My next upcoming appointment highlighted
  - All my appointments in chronological order
  - A button to create a new appointment
```

### 5.5 Use Case: Mobile Appointment Booking
```
Given a patient on a mobile device
When I navigate to book an appointment
Then the form should:
  - Stack vertically for easy scrolling
  - Show large, touchable buttons
  - Display a mobile-friendly date/time picker
  - Allow one-handed operation
  - Maintain all validation and confirmation flows
```

---

## 6. Functional Requirements

### 6.1 Authentication Module
- **FR-AUTH-001:** System shall validate user credentials against stored records
- **FR-AUTH-002:** System shall generate and store authentication token on successful login
- **FR-AUTH-003:** System shall retrieve current session from browser storage
- **FR-AUTH-004:** System shall clear session data on logout
- **FR-AUTH-005:** System shall redirect unauthenticated users to login page
- **FR-AUTH-006:** System shall display demo credentials for testing purposes

### 6.2 Dashboard Module
- **FR-DASH-001:** System shall display personalized greeting with patient name
- **FR-DASH-002:** System shall calculate and display appointment statistics by status
- **FR-DASH-003:** System shall display next upcoming appointment in prominent card
- **FR-DASH-004:** System shall render responsive layout (2 columns desktop, 1 column mobile)
- **FR-DASH-005:** System shall provide logout functionality in header

### 6.3 Appointment Management
- **FR-APT-001:** System shall fetch and display all patient appointments
- **FR-APT-002:** System shall display status badge for each appointment
- **FR-APT-003:** System shall sort appointments chronologically (upcoming first)
- **FR-APT-004:** System shall handle empty appointment list with appropriate message
- **FR-APT-005:** System shall display loading state during data fetch
- **FR-APT-006:** System shall create new appointments with validation
- **FR-APT-007:** System shall confirm appointment creation with success message
- **FR-APT-008:** System shall add new appointment to list immediately after creation

### 6.4 Form Handling
- **FR-FORM-001:** System shall validate required fields before submission
- **FR-FORM-002:** System shall display inline error messages for invalid inputs
- **FR-FORM-003:** System shall prevent past dates in appointment booking
- **FR-FORM-004:** System shall clear form after successful submission
- **FR-FORM-005:** System shall support multi-line text in reason/chief complaint field

### 6.5 UI/UX Standards
- **FR-UI-001:** System shall display loading spinner during async operations
- **FR-UI-002:** System shall display error messages clearly and actionably
- **FR-UI-003:** System shall use consistent visual design (Tailwind CSS)
- **FR-UI-004:** System shall provide keyboard navigation for all interactive elements
- **FR-UI-005:** System shall support screen reader access via semantic HTML and ARIA labels

---

## 7. Non-Functional Requirements

### 7.1 Performance
- **NFR-PERF-001:** Page load time ≤ 2 seconds on broadband connection
- **NFR-PERF-002:** Dashboard should render within 500ms of authentication
- **NFR-PERF-003:** Form submission response within 1 second
- **NFR-PERF-004:** Application bundle size ≤ 500KB (gzipped)
- **NFR-PERF-005:** Support ≥ 10,000 appointments in memory without lag

### 7.2 Security
- **NFR-SEC-001:** All sensitive data stored in sessionStorage (not localStorage)
- **NFR-SEC-002:** Authentication token must be validated before accessing protected routes
- **NFR-SEC-003:** Passwords never transmitted in plain text (mock uses hashing)
- **NFR-SEC-004:** CORS headers configured appropriately for production API
- **NFR-SEC-005:** Input validation on all form fields

### 7.3 Reliability & Availability
- **NFR-REL-001:** Application uptime ≥ 99.5% (production)
- **NFR-REL-002:** Error handling prevents application crashes
- **NFR-REL-003:** Graceful fallback for failed API calls
- **NFR-REL-004:** Session recovery after network interruption

### 7.4 Scalability
- **NFR-SCALE-001:** Application shall support ≥ 1,000 concurrent users
- **NFR-SCALE-002:** Database queries optimized with React Query caching
- **NFR-SCALE-003:** Lazy loading for appointment lists (optional enhancement)
- **NFR-SCALE-004:** API response time ≤ 500ms for 95th percentile

### 7.5 Accessibility
- **NFR-ACC-001:** WCAG 2.1 AA compliance
- **NFR-ACC-002:** Keyboard navigation for all interactive elements
- **NFR-ACC-003:** Color contrast ratio ≥ 4.5:1 for text
- **NFR-ACC-004:** Screen reader compatibility with semantic HTML
- **NFR-ACC-005:** Focus indicators visible on all focusable elements
- **NFR-ACC-006:** Form labels properly associated with inputs
- **NFR-ACC-007:** Mobile font size ≥ 16px to prevent auto-zoom

### 7.6 Usability
- **NFR-USAB-001:** User can complete login within 30 seconds
- **NFR-USAB-002:** User can book appointment within 2 minutes
- **NFR-USAB-003:** Mobile UI optimized for touch (minimum 48px touch targets)
- **NFR-USAB-004:** Intuitive navigation with max 3 clicks to any feature

### 7.7 Browser & Device Support
- **NFR-BROWSER-001:** Chrome ≥ 90
- **NFR-BROWSER-002:** Firefox ≥ 88
- **NFR-BROWSER-003:** Safari ≥ 14
- **NFR-BROWSER-004:** Edge ≥ 90
- **NFR-BROWSER-005:** Mobile: iOS Safari ≥ 14, Chrome Android ≥ 90
- **NFR-BROWSER-006:** Support for screen sizes: 320px (mobile) to 2560px (4K)

### 7.8 Code Quality
- **NFR-CODE-001:** Unit test coverage ≥ 80% for business logic
- **NFR-CODE-002:** No TypeScript errors (strict mode)
- **NFR-CODE-003:** ESLint compliance with Oxlint
- **NFR-CODE-004:** Component reusability: UI components used in ≥ 2 places
- **NFR-CODE-005:** Hooks extraction for common logic patterns

---

## 8. Success Metrics & KPIs

### Adoption Metrics
- **Patient Registration Rate:** Target 85% of eligible patients register within 3 months
- **Monthly Active Users:** Track MAU growth month-over-month
- **User Retention:** 70% of registered users return within 30 days

### Engagement Metrics
- **Appointment Booking Rate:** 60% of logins result in appointment action (view/create)
- **Average Session Duration:** ≥ 3 minutes
- **Pages Per Session:** ≥ 2.5 pages
- **Bounce Rate:** ≤ 30% from login page

### Clinical/Business Metrics
- **Appointment No-Show Rate:** Reduce by 20% YoY through improved visibility
- **Administrator Time Saved:** Reduce phone call time by 40%
- **Patient Satisfaction:** Net Promoter Score (NPS) ≥ 50
- **Average Appointment Confirmation Time:** ≤ 24 hours

### Technical Metrics
- **Application Uptime:** 99.5%+
- **Error Rate:** < 0.5% of requests
- **Average Response Time:** < 200ms
- **Page Load Performance:** 90th percentile < 2 seconds
- **Crash-Free Users:** ≥ 99%

### User Experience Metrics
- **Task Completion Rate:** ≥ 95% for login, view appointments, and book appointment
- **Time to Task Completion:**
  - Login: ≤ 1 minute
  - View appointments: ≤ 30 seconds
  - Book appointment: ≤ 2 minutes
- **User Satisfaction:** CSAT score ≥ 4/5

---

## 9. Technical Stack & Architecture

### Frontend Technology
- **Framework:** React 19 with TypeScript
- **Routing:** React Router v7
- **State Management:** React Query (TanStack Query) v5 for server state
- **Styling:** Tailwind CSS v4 with Vite integration
- **Build Tool:** Vite v8
- **Testing:** Vitest with jsdom
- **Linting:** Oxlint
- **UI Component Library:** Custom, reusable components in `shared/components/ui`

### Architecture Pattern
- **Feature-Based Folder Structure:** Organized by business feature (auth, appointments, dashboard)
- **Custom Hooks:** Business logic abstraction (useAuth, useAppointments, etc.)
- **Mock Data Layer:** In-memory data simulation with `mockDb.ts`
- **API Abstraction:** Mock API clients in `features/*/api/`
- **Responsive Design:** Mobile-first with Tailwind responsive classes

### Project Structure
```
src/
├── app/                          # App-level configuration
│   ├── providers.tsx            # Context/provider setup
│   └── routes.tsx               # Route definitions
├── features/                     # Feature-based modules
│   ├── auth/                    # Authentication feature
│   ├── appointments/            # Appointment management
│   └── dashboard/               # Dashboard feature
├── shared/                       # Shared utilities and components
│   ├── components/ui/           # Reusable UI components
│   └── lib/                     # Utilities (cn.ts, queryClient.ts)
├── mocks/                        # Mock data and database
├── types/                        # Global TypeScript types
└── test/                         # Test setup and mocks
```

---

## 10. Scope & Constraints

### In Scope (MVP)
✅ User authentication (login/logout)  
✅ Patient dashboard with statistics  
✅ Appointment viewing and management  
✅ Appointment creation/booking  
✅ Responsive design (desktop + mobile)  
✅ Mock data (no real database required)  
✅ Basic error handling  
✅ Loading states and empty states  
✅ Unit tests for core logic  
✅ TypeScript strict mode  

### Out of Scope (Future Enhancements)
❌ Appointment cancellation/rescheduling  
❌ Email/SMS notifications  
❌ Doctor profile pages  
❌ Prescription management  
❌ Medical records/history  
❌ Insurance integration  
❌ Payment processing  
❌ Video consultation booking  
❌ Multi-language support (v2)  
❌ Advanced analytics/reporting  
❌ Two-factor authentication  
❌ Appointment reminders  
❌ Ratings/reviews of doctors  

### Technical Constraints
- **No Backend Required:** MVP uses only mock data (enables offline development)
- **Browser Storage Only:** Limited to sessionStorage (no persistent backend database)
- **Single User Context:** Designed for one logged-in user at a time
- **Memory-Based Data:** All data reset on page reload
- **No Real Payments:** Mock appointment booking (no transaction processing)

### Timeline Constraints
- **MVP Target:** Production-ready for internal testing
- **Integration Phase:** Ready for backend API integration upon completion
- **Deployment:** Containerized for easy deployment to cloud environments

---

## 11. Dependencies & Assumptions

### Assumptions
- **User Assumption:** Patients have basic computer/mobile literacy
- **Device Assumption:** Target devices have modern browsers (ES2020+ support)
- **Network Assumption:** Reliable internet connection (3G+ sufficient)
- **Data Assumption:** Mock data is representative of real-world appointment scenarios
- **Authentication Assumption:** Backend will provide similar auth endpoint structure
- **API Assumption:** Backend will follow RESTful conventions
- **Doctor Master Data:** Doctors and their schedules are pre-loaded
- **Time Zone:** Application operates in patient's local time zone

### Dependencies
- **External Libraries:** React, React Router, React Query, Tailwind CSS, TypeScript
- **Browser APIs:** sessionStorage, localStorage, Fetch API
- **Development Tools:** Node.js v18+, npm/yarn, Vite build system
- **Backend Integration:** Will depend on actual API structure (to be determined)

---

## 12. Risks & Mitigation

### Risk 1: Backend Integration Complexity
**Risk:** Mock API structure may not match real backend  
**Mitigation:**
- Define API contract early with backend team
- Use abstraction layer in API clients for easy migration
- Create adapter pattern for API transformation

### Risk 2: Performance with Large Appointment Lists
**Risk:** Rendering 10,000+ appointments may cause lag  
**Mitigation:**
- Implement React Query pagination
- Add virtual scrolling (windowing) for large lists
- Optimize React component rendering with useMemo/useCallback

### Risk 3: Mobile UX Issues
**Risk:** Complex forms may not work well on small screens  
**Mitigation:**
- Test on actual devices (not just browser emulation)
- Implement touch-friendly date/time pickers
- Ensure minimum 48px touch targets

### Risk 4: Accessibility Compliance
**Risk:** WCAG 2.1 AA may be difficult to achieve  
**Mitigation:**
- Automated accessibility testing with axe/jest-axe
- Manual testing with screen readers (NVDA, JAWS)
- Regular accessibility audits

### Risk 5: Cross-Browser Compatibility
**Risk:** CSS or JavaScript features may not work in older browsers  
**Mitigation:**
- Use Tailwind CSS (battle-tested)
- Maintain TypeScript for type safety
- Test on target browsers early and often

---

## 13. Definition of Done (DoD)

A feature is considered complete when:

✅ **Functionality**
- [ ] Feature implemented according to specifications
- [ ] All acceptance criteria met
- [ ] User can complete task end-to-end

✅ **Quality**
- [ ] Unit tests written (≥80% coverage for the feature)
- [ ] No TypeScript errors in strict mode
- [ ] Oxlint passes without warnings
- [ ] Code reviewed and approved

✅ **Performance**
- [ ] Page load time ≤ 2 seconds
- [ ] No console errors or warnings
- [ ] React DevTools shows no unnecessary re-renders

✅ **Accessibility**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Focus indicators visible

✅ **Documentation**
- [ ] Code comments for complex logic
- [ ] TypeScript types properly defined
- [ ] README updated if necessary

✅ **Cross-Browser Testing**
- [ ] Chrome ≥ 90
- [ ] Firefox ≥ 88
- [ ] Safari ≥ 14
- [ ] Mobile browsers (iOS Safari, Chrome Android)

✅ **Responsive Testing**
- [ ] Mobile (320px): all interactive elements accessible
- [ ] Tablet (768px): layout adapts correctly
- [ ] Desktop (1920px): full layout utilized

---

## 14. Roadmap & Phases

### Phase 1: MVP (Current)
**Goals:** Core functionality, authentication, dashboard, appointment booking  
**Duration:** 2-4 weeks  
**Deliverables:**
- ✅ Login/authentication flow
- ✅ Patient dashboard
- ✅ Appointment list
- ✅ Create appointment form
- ✅ Responsive design
- ✅ Mock data layer

### Phase 2: Backend Integration
**Goals:** Connect to real backend API, remove mock data  
**Duration:** 2-3 weeks  
**Deliverables:**
- Real authentication endpoint
- Real appointment data API
- Database integration
- Production deployment

### Phase 3: Enhanced Features (v1.1)
**Goals:** Improve user experience and functionality  
**Duration:** 3-4 weeks  
**Deliverables:**
- Appointment cancellation/rescheduling
- Email/SMS notifications
- Appointment reminders
- Doctor profile pages
- Search/filter appointments
- User profile management

### Phase 4: Advanced Features (v2.0)
**Goals:** Expand platform capabilities  
**Duration:** 6+ weeks  
**Deliverables:**
- Multi-language support
- Video consultation integration
- Medical records access
- Prescription management
- Analytics dashboard
- Two-factor authentication

---

## 15. Glossary

| Term | Definition |
|------|-----------|
| **SPA** | Single Page Application — web app that loads once and updates dynamically |
| **Mock Data** | Simulated data used for testing without a real database |
| **TanStack Query** | Data fetching/caching library for managing server state |
| **WCAG 2.1 AA** | Web Content Accessibility Guidelines Level AA compliance |
| **Appointment Status** | Pending, Confirmed, Completed, Cancelled |
| **Session** | User's authenticated login state |
| **Chief Complaint** | Patient's primary reason for medical visit |
| **NoSQL** | Non-relational database (future backend consideration) |

---

## 16. Approval Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Manager | — | — | — |
| Engineering Lead | — | — | — |
| UX/Design Lead | — | — | — |
| Medical Advisor | — | — | — |
| Stakeholder | — | — | — |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Aug 2026 | Dev Team | Initial PRD creation |

---

**Document Owner:** Development Team  
**Next Review Date:** Oct 2026  
**Last Review:** Aug 2026
