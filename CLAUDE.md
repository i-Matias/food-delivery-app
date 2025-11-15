# CLAUDE.md - Food Delivery App

This document provides a comprehensive guide for AI assistants working on this food delivery application codebase. It covers architecture, conventions, patterns, and workflows to ensure consistent and effective development.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Architecture Patterns](#architecture-patterns)
5. [File Naming Conventions](#file-naming-conventions)
6. [Code Conventions](#code-conventions)
7. [State Management](#state-management)
8. [Authentication Flow](#authentication-flow)
9. [Routing and Navigation](#routing-and-navigation)
10. [Styling Guidelines](#styling-guidelines)
11. [Component Development](#component-development)
12. [Development Workflows](#development-workflows)
13. [Key Files Reference](#key-files-reference)
14. [Environment Variables](#environment-variables)
15. [Common Tasks](#common-tasks)

---

## Project Overview

A React Native food delivery mobile application built with Expo, featuring:
- User authentication (sign up/sign in)
- Location-based services with GPS integration
- Food browsing with category cards
- User profile management
- Shopping cart functionality (in development)
- Search functionality (in development)

**Current State:** Core authentication and profile features implemented. Search and cart features are placeholders awaiting development.

---

## Technology Stack

### Core Framework
- **React 19.0.0** - Latest React with modern features
- **React Native 0.79.5** - Cross-platform mobile development
- **Expo SDK 53** - Development framework and tooling
- **TypeScript 5.8.3** - Type-safe JavaScript

### Key Libraries
- **Expo Router 5.1.3** - File-based routing system
- **Supabase 2.50.3** - Backend as a Service (authentication, database)
- **Zustand 5.0.6** - Lightweight state management
- **NativeWind 4.1.23** - Tailwind CSS for React Native
- **Expo Location 18.1.6** - GPS and geocoding services

### Navigation
- **@react-navigation/native 7.1.6** - Navigation library
- **@react-navigation/bottom-tabs 7.3.10** - Tab navigation

### Development Tools
- **ESLint 9.25.0** - Code linting
- **Prettier** with Tailwind plugin - Code formatting
- **TypeScript** - Static type checking

---

## Directory Structure

```
/home/user/food-delivery-app/
├── app/                          # Expo Router file-based routing
│   ├── (auth)/                  # Authentication routes (group)
│   │   ├── _layout.tsx          # Auth stack layout
│   │   ├── signIn.tsx           # Sign in screen
│   │   └── signUp.tsx           # Sign up screen
│   ├── (tabs)/                  # Tab navigation routes (group)
│   │   ├── _layout.tsx          # Bottom tabs layout
│   │   ├── home.tsx             # Home feed screen
│   │   ├── search.tsx           # Search screen (placeholder)
│   │   ├── cart.tsx             # Shopping cart (placeholder)
│   │   └── profile.tsx          # User profile screen
│   ├── _layout.tsx              # Root layout (fonts, providers)
│   ├── index.tsx                # Entry point with auth routing
│   └── globals.css              # Global Tailwind styles
├── components/                   # Reusable UI components
│   ├── signForm.tsx             # Auth form (sign in/up)
│   ├── Success.tsx              # Success modal with animations
│   ├── header.tsx               # Header with location
│   ├── FoodCategoryCard.tsx     # Food category card
│   └── EditableProfileInfoField.tsx  # Editable profile field
├── store/                        # Zustand state management
│   └── authStore.ts             # Authentication state
├── lib/                          # External service integrations
│   └── supabase.ts              # Supabase client config
├── hooks/                        # Custom React hooks
│   └── useLocation.ts           # Location hook
├── types/                        # TypeScript type definitions
│   └── images.d.ts              # Image module declarations
├── constans/                     # Constants (note: typo in original)
│   └── index.ts                 # Images, icons, categories
├── assets/                       # Static assets (gitignored)
│   ├── icons/                   # SVG/PNG icons
│   ├── images/                  # App images
│   └── fonts/                   # Quicksand font family
└── Configuration files (various)
```

**Important Notes:**
- Route groups `(auth)` and `(tabs)` hide segments from URLs
- `_layout.tsx` files define navigation structure
- `index.tsx` is the app entry point and auth router
- Assets directory is gitignored (not in version control)

---

## Architecture Patterns

### File-Based Routing (Expo Router)
- Routes are defined by file structure in `app/` directory
- Parentheses `()` create route groups without affecting URLs
- `_layout.tsx` files define nested navigation structures
- `index.tsx` serves as default route for each directory

### State Management Philosophy
- **Global State:** Zustand stores for app-wide state (auth, cart, etc.)
- **Local State:** React `useState` for component-specific state
- **Persistent State:** AsyncStorage via Zustand middleware
- **Server State:** Supabase real-time subscriptions

### Component Architecture
- **Presentational Components:** Reusable UI components in `components/`
- **Screen Components:** Route-specific components in `app/`
- **Layout Components:** `_layout.tsx` files for navigation structure
- **Custom Hooks:** Shared logic extracted to `hooks/`

### Separation of Concerns
- **UI Layer:** React components with Tailwind styling
- **State Layer:** Zustand stores for state management
- **Service Layer:** Supabase client for backend operations
- **Business Logic:** Store actions and custom hooks

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `FoodCategoryCard.tsx` |
| Screen Components | camelCase | `signIn.tsx`, `home.tsx` |
| Hooks | camelCase with "use" prefix | `useLocation.ts` |
| Stores | camelCase with "Store" suffix | `authStore.ts` |
| Utilities | camelCase | `supabase.ts` |
| Layouts | Fixed name | `_layout.tsx` |
| Constants | camelCase | `index.ts` |
| Types | camelCase with `.d.ts` | `images.d.ts` |

**Key Rules:**
- Use `.tsx` for files containing JSX
- Use `.ts` for pure TypeScript files
- All component files should have default exports
- Utility files can have named exports

---

## Code Conventions

### Import Organization
Organize imports in this order:
1. React imports
2. External library imports
3. Internal imports (using `@/` alias)
4. Asset imports

```typescript
// 1. React
import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

// 2. External libraries
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// 3. Internal
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/header';

// 4. Assets
import { icons, images } from '@/constans';
```

### Component Structure Template

```typescript
// 1. Imports (organized as above)
import React from 'react';
import { View, Text } from 'react-native';

// 2. Type definitions
interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
}

// 3. Component definition
export default function ComponentName({
  requiredProp,
  optionalProp = defaultValue
}: ComponentNameProps) {
  // 4. Hooks
  const [state, setState] = useState<Type>(initialValue);

  // 5. Event handlers
  const handleEvent = () => {
    // logic
  };

  // 6. Effects
  useEffect(() => {
    // side effects
  }, [dependencies]);

  // 7. JSX return
  return (
    <View className="custom-class">
      <Text>{requiredProp}</Text>
    </View>
  );
}
```

### TypeScript Guidelines

**Use Strict Typing:**
- Enable strict mode (already configured)
- Define interfaces for all props
- Avoid `any` type unless absolutely necessary
- Use type inference where obvious

**Common Type Patterns:**
```typescript
// Props interface
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// Store state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Store actions interface
interface AuthActions {
  signIn: (data: SignFormPayload) => Promise<void>;
  signOut: () => Promise<void>;
}

// Combined store type
type AuthStore = AuthState & AuthActions;
```

### Error Handling Pattern

```typescript
try {
  // Async operation
  const result = await supabase.auth.signIn(credentials);

  if (result.error) {
    throw result.error;
  }

  // Success handling
  setState(result.data);

} catch (error) {
  // Log error for debugging
  console.error('Operation failed:', error);

  // User-facing feedback
  Alert.alert('Error', 'Operation failed. Please try again.');

  // Re-throw if needed for upstream handling
  throw error;
}
```

---

## State Management

### Zustand Store Pattern

**Current Store:** `authStore.ts` (Location: `/home/user/food-delivery-app/store/authStore.ts`)

**Store Structure:**
```typescript
// 1. Define state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 2. Define actions interface
interface AuthActions {
  initialize: () => Promise<void>;
  signUp: (data: SignFormPayload) => Promise<void>;
  signIn: (data: SignFormPayload) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
}

// 3. Combine types
type AuthStore = AuthState & AuthActions;

// 4. Create store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      initialize: async () => {
        // Implementation
      },
      // ... other actions
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

**Usage in Components:**
```typescript
// Get state
const { user, isAuthenticated } = useAuthStore();

// Get actions
const { signIn, signOut } = useAuthStore();

// Selective subscription (better performance)
const user = useAuthStore((state) => state.user);
```

**Creating New Stores:**
1. Create file in `store/` directory: `[feature]Store.ts`
2. Follow the pattern above
3. Add persistence if needed
4. Export typed hook: `useFeatureStore`

---

## Authentication Flow

### Overview
The app uses Supabase authentication with email/password.

**Flow Diagram:**
```
App Start (index.tsx)
    ↓
Initialize Auth Store
    ↓
Check Session (isLoading: true)
    ↓
    ├─ Authenticated? → Redirect to /(tabs)/home
    └─ Not Authenticated? → Redirect to /(auth)/signIn
```

### Authentication States

**Loading State:**
```typescript
// Show while checking authentication
if (isLoading) {
  return <ActivityIndicator />;
}
```

**Authenticated State:**
```typescript
// User is signed in
if (isAuthenticated) {
  router.replace('/(tabs)/home');
}
```

**Unauthenticated State:**
```typescript
// User needs to sign in
if (!isAuthenticated) {
  router.replace('/(auth)/signIn');
}
```

### Sign Up Process

1. User fills form in `signUp.tsx`
2. Form data sent to `authStore.signUp()`
3. Store calls `supabase.auth.signUp()`
4. On success:
   - User object stored in state
   - Session saved to AsyncStorage
   - Success modal displayed
   - Router redirects to home
5. On error:
   - Error logged to console
   - Alert shown to user

### Sign In Process

1. User fills form in `signIn.tsx`
2. Form data sent to `authStore.signIn()`
3. Store calls `supabase.auth.signInWithPassword()`
4. On success:
   - User object stored in state
   - Session saved to AsyncStorage
   - Success modal displayed
   - Router redirects to home
5. On error:
   - Error logged to console
   - Alert shown to user

### Sign Out Process

1. User taps sign out button
2. `authStore.signOut()` called
3. Store calls `supabase.auth.signOut()`
4. State cleared (user: null, isAuthenticated: false)
5. Router redirects to sign in

### Auth Listener

The store sets up a real-time auth state listener:

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    set({
      user: session.user,
      isAuthenticated: true,
      isLoading: false,
    });
  } else {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }
});
```

This ensures the app responds to:
- Sign in/out from other devices
- Token expiration
- Session refresh

### User Profile Data

User metadata is stored in Supabase user object:

```typescript
user.user_metadata = {
  full_name: string;
  phone: string;
  address1: string;
  address2: string;
  profile: string; // Avatar URL
}
```

Update profile with:
```typescript
await authStore.updateProfile({
  full_name: 'John Doe',
  phone: '+1234567890',
  address1: '123 Main St',
});
```

---

## Routing and Navigation

### Expo Router Configuration

**Route Structure:**
```
/                           → index.tsx (auth router)
├── (auth)/                 → Stack navigator
│   ├── signIn             → Sign in screen
│   └── signUp             → Sign up screen
└── (tabs)/                 → Bottom tabs navigator
    ├── home               → Home feed
    ├── search             → Search
    ├── cart               → Shopping cart
    └── profile            → User profile
```

### Navigation Patterns

**Programmatic Navigation:**
```typescript
import { router } from 'expo-router';

// Replace (no back navigation)
router.replace('/(tabs)/home');

// Push (add to stack)
router.push('/product/123');

// Back
router.back();

// Navigate with params
router.push({
  pathname: '/product/[id]',
  params: { id: '123' }
});
```

**Link Components:**
```typescript
import { Link } from 'expo-router';

// Basic link
<Link href="/(auth)/signUp">Sign Up</Link>

// With styling
<Link href="/profile" className="custom-btn">
  <Text>View Profile</Text>
</Link>
```

### Layout Files

**Root Layout (`app/_layout.tsx`):**
- Loads fonts
- Manages splash screen
- Wraps in SafeAreaProvider
- Imports global CSS

**Auth Layout (`app/(auth)/_layout.tsx`):**
- Stack navigator
- Hides header
- Presentation: card

**Tabs Layout (`app/(tabs)/_layout.tsx`):**
- Bottom tab navigator
- Custom styling (rounded, floating)
- Icons with active/inactive states
- Safe area insets

### Route Groups

**Purpose:** Organize routes without affecting URLs

**Syntax:** `(groupName)`

**Example:**
- File: `app/(auth)/signIn.tsx`
- URL: `/signIn` (not `/auth/signIn`)

**Benefits:**
- Logical organization
- Shared layouts
- Clean URLs

---

## Styling Guidelines

### NativeWind/Tailwind Setup

**Configuration:** `tailwind.config.js`

**Custom Theme:**

```javascript
theme: {
  extend: {
    colors: {
      primary: '#FE8C00',        // Orange brand color
      'dark-100': '#181C2E',     // Dark backgrounds
      'gray-100': '#878787',     // Light gray text
      'gray-200': '#7E8392',     // Medium gray text
      error: '#F14141',          // Error states
      success: '#2F9B65',        // Success states
    },
    fontFamily: {
      quicksand: ['Quicksand-Regular'],
      'quicksand-bold': ['Quicksand-Bold'],
      'quicksand-semibold': ['Quicksand-SemiBold'],
      'quicksand-light': ['Quicksand-Light'],
      'quicksand-medium': ['Quicksand-Medium'],
    },
  },
}
```

### Custom CSS Classes

**Location:** `app/globals.css`

**Utility Classes:**
```css
.flex-center      /* Center items on both axes */
.flex-between     /* Space between with center align */
.flex-start       /* Start alignment with center cross-axis */
```

**Component Classes:**
```css
.custom-btn       /* Primary button style */
.custom-header    /* Page header layout */
.label           /* Form label style */
.input           /* Form input style */
.cart-btn        /* Cart button style */
.cart-badge      /* Cart badge counter */
.profile-field   /* Profile field container */
.profile-avatar  /* Profile avatar image */
.menu-card       /* Menu item card */
.offer-card      /* Special offer card */
.searchbar       /* Search input bar */
.filter          /* Filter button */
```

**Typography Classes:**
```css
.h1-bold         /* 32px, bold */
.h3-bold         /* 24px, bold */
.base-bold       /* 16px, bold */
.base-semibold   /* 16px, semibold */
.paragraph-bold  /* 14px, bold */
.paragraph-semibold /* 14px, semibold */
.paragraph-regular  /* 14px, regular */
.body-bold       /* 18px, bold */
.small-bold      /* 13px, bold */
```

### Styling Best Practices

**Prefer Tailwind Classes:**
```typescript
// Good
<View className="flex-1 bg-white p-4">
  <Text className="h1-bold text-dark-100">Title</Text>
</View>

// Avoid (unless dynamic)
<View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
  <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Title</Text>
</View>
```

**Use Custom Classes for Repeated Patterns:**
```typescript
// Good - reusable
<TouchableOpacity className="custom-btn">
  <Text className="base-bold text-white">Submit</Text>
</TouchableOpacity>

// Avoid - duplicating styles
<TouchableOpacity className="bg-primary rounded-lg py-3 px-6">
  <Text className="text-white font-bold">Submit</Text>
</TouchableOpacity>
```

**Inline Styles for Dynamic Values:**
```typescript
// Good - dynamic color
<View style={{ backgroundColor: category.color }}>
  <Text className="base-bold">{category.name}</Text>
</View>

// Good - computed position
<Animated.View
  style={{
    transform: [{ translateY: slideAnim }]
  }}
  className="bg-white rounded-lg"
>
```

### Responsive Design

**Use Tailwind Utilities:**
```typescript
<View className="w-full md:w-1/2 lg:w-1/3">
  {/* Responsive width */}
</View>
```

**Screen-Specific Styles:**
```typescript
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();
const isTablet = width >= 768;
```

---

## Component Development

### Creating a New Component

**Steps:**

1. **Create File:** `components/ComponentName.tsx`

2. **Define Props Interface:**
```typescript
interface ComponentNameProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}
```

3. **Implement Component:**
```typescript
export default function ComponentName({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ComponentNameProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`custom-btn ${variant === 'secondary' ? 'bg-gray-100' : ''}`}
    >
      <Text className="base-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
}
```

4. **Use in Screens:**
```typescript
import ComponentName from '@/components/ComponentName';

<ComponentName
  title="Click Me"
  onPress={handlePress}
  variant="secondary"
/>
```

### Existing Components Reference

#### SignForm
**File:** `components/signForm.tsx`

**Purpose:** Dual-purpose authentication form

**Props:**
```typescript
interface SignFormProps {
  type: 'signIn' | 'signUp';
}
```

**Features:**
- Email and password inputs
- Conditional full name field (signUp only)
- Form validation
- Loading states
- Success modal integration
- Background image

**Usage:**
```typescript
<SignForm type="signUp" />
```

#### Success
**File:** `components/Success.tsx`

**Purpose:** Animated success modal

**Props:**
```typescript
interface SuccessProps {
  type: 'signIn' | 'signUp';
}
```

**Features:**
- Blur overlay
- Spring animations
- Type-specific messaging
- Auto-navigation after delay

**Usage:**
```typescript
const [showSuccess, setShowSuccess] = useState(false);

{showSuccess && <Success type="signUp" />}
```

#### Header
**File:** `components/header.tsx`

**Purpose:** App header with location

**Props:** None (uses hooks internally)

**Features:**
- Location display with GPS
- Cart icon with badge
- Permission handling
- Automatic geocoding

**Usage:**
```typescript
<Header />
```

#### FoodCategoryCard
**File:** `components/FoodCategoryCard.tsx`

**Purpose:** Configurable food card

**Props:**
```typescript
interface FoodCategoryCardProps {
  title: string;
  description: string;
  price?: string;
  image: any;
  imagePosition?: 'left' | 'right';
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  onPress?: () => void;
}
```

**Features:**
- Flexible layout (image left/right)
- Optional pricing
- Custom backgrounds
- Text alignment options

**Usage:**
```typescript
<FoodCategoryCard
  title="Burger"
  description="Delicious burger"
  price="$9.99"
  image={images.burger}
  imagePosition="right"
  backgroundColor="#FFF5EE"
  onPress={() => console.log('Tapped')}
/>
```

#### EditableProfileInfoField
**File:** `components/EditableProfileInfoField.tsx`

**Purpose:** Editable profile fields

**Props:**
```typescript
interface EditableProfileInfoFieldProps {
  icon: any;
  field: string;
  value: string;
  onSave: (value: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}
```

**Features:**
- Toggle edit mode
- Icon-based identification
- Keyboard type support
- Save/cancel actions

**Usage:**
```typescript
<EditableProfileInfoField
  icon={icons.user}
  field="Name"
  value={user?.user_metadata?.full_name || ''}
  onSave={handleSaveName}
/>
```

### Component Design Principles

**Single Responsibility:**
- Each component should do one thing well
- Extract complex logic into hooks
- Keep components focused and small

**Reusability:**
- Design for multiple use cases
- Use props for customization
- Provide sensible defaults

**Type Safety:**
- Always define prop interfaces
- Use TypeScript features
- Avoid `any` types

**Performance:**
- Use `React.memo` for expensive renders
- Optimize list rendering with keys
- Avoid inline function definitions

---

## Development Workflows

### Starting Development

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

### Creating a New Screen

1. **Create Screen File:**
   - Auth screen: `app/(auth)/screenName.tsx`
   - Tab screen: `app/(tabs)/screenName.tsx`

2. **Add to Layout:**
```typescript
// In appropriate _layout.tsx
<Stack.Screen
  name="screenName"
  options={{
    title: 'Screen Title',
    headerShown: true,
  }}
/>
```

3. **Implement Screen:**
```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenName() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Screen content */}
    </SafeAreaView>
  );
}
```

### Adding a New Feature

**Example: Implementing Search Functionality**

1. **Create Store (if needed):**
```typescript
// store/searchStore.ts
export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  results: [],
  isLoading: false,

  search: async (query: string) => {
    set({ isLoading: true, query });
    // Implementation
  },
}));
```

2. **Update Screen:**
```typescript
// app/(tabs)/search.tsx
import { useSearchStore } from '@/store/searchStore';

export default function Search() {
  const { query, results, search } = useSearchStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TextInput
        value={query}
        onChangeText={search}
        className="searchbar"
        placeholder="Search for food..."
      />
      {/* Results */}
    </SafeAreaView>
  );
}
```

3. **Create Components:**
```typescript
// components/SearchResultCard.tsx
export default function SearchResultCard({ item }: Props) {
  // Implementation
}
```

4. **Test Thoroughly:**
   - Test on iOS simulator
   - Test on Android emulator
   - Test on physical device
   - Test edge cases

### Adding State Management

**When to Use:**
- Data shared across multiple screens
- Data that needs persistence
- Complex state logic
- Real-time updates

**Steps:**

1. **Create Store File:** `store/featureStore.ts`

2. **Define Types:**
```typescript
interface FeatureState {
  data: DataType[];
  isLoading: boolean;
  error: string | null;
}

interface FeatureActions {
  fetchData: () => Promise<void>;
  addItem: (item: DataType) => void;
  removeItem: (id: string) => void;
}

type FeatureStore = FeatureState & FeatureActions;
```

3. **Create Store:**
```typescript
export const useFeatureStore = create<FeatureStore>()(
  persist(
    (set, get) => ({
      data: [],
      isLoading: false,
      error: null,

      fetchData: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('table')
            .select('*');

          if (error) throw error;
          set({ data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      addItem: (item) => {
        set({ data: [...get().data, item] });
      },

      removeItem: (id) => {
        set({ data: get().data.filter(i => i.id !== id) });
      },
    }),
    {
      name: 'feature-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

4. **Use in Components:**
```typescript
const { data, fetchData } = useFeatureStore();

useEffect(() => {
  fetchData();
}, []);
```

### Working with Supabase

**Query Data:**
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value)
  .order('created_at', { ascending: false });
```

**Insert Data:**
```typescript
const { data, error } = await supabase
  .from('table_name')
  .insert([
    { column1: value1, column2: value2 }
  ]);
```

**Update Data:**
```typescript
const { data, error } = await supabase
  .from('table_name')
  .update({ column: newValue })
  .eq('id', itemId);
```

**Delete Data:**
```typescript
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', itemId);
```

**Real-time Subscription:**
```typescript
const subscription = supabase
  .channel('table_changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'table_name' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Cleanup
return () => {
  subscription.unsubscribe();
};
```

### Linting and Formatting

```bash
# Run linter
npm run lint

# Auto-fix issues (if configured)
npm run lint -- --fix
```

**VS Code Auto-Format:**
- Auto-fix on save: Enabled
- Organize imports on save: Enabled
- Sort members on save: Enabled

---

## Key Files Reference

### Entry Point
**File:** `app/index.tsx`

**Purpose:** Auth routing logic

**Key Logic:**
```typescript
useEffect(() => {
  initialize();
}, []);

if (isLoading) return <ActivityIndicator />;

return (
  <Redirect href={isAuthenticated ? '/(tabs)/home' : '/(auth)/signIn'} />
);
```

### Root Layout
**File:** `app/_layout.tsx`

**Responsibilities:**
- Load custom fonts
- Manage splash screen
- Provide SafeAreaProvider
- Import global CSS
- Configure root navigation

### Auth Store
**File:** `store/authStore.ts`

**Actions:**
- `initialize()` - Check and restore session
- `signUp(data)` - Register new user
- `signIn(data)` - Authenticate user
- `signOut()` - Log out user
- `updateProfile(data)` - Update user metadata

### Supabase Client
**File:** `lib/supabase.ts`

**Configuration:**
```typescript
const supabaseUrl = 'https://ymljkhdpuaieivqcwrum.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
```

### Location Hook
**File:** `hooks/useLocation.ts`

**Returns:**
```typescript
{
  address: string | null;      // Human-readable address
  location: LocationObject | null;  // GPS coordinates
  loading: boolean;
  error: string | null;
}
```

**Usage:**
```typescript
const { address, loading } = useLocation();
```

### Constants
**File:** `constans/index.ts` (note: typo in original)

**Exports:**
- `icons` - Icon assets object
- `images` - Image assets object
- `categories` - Food categories array
- `popularMenu` - Popular items array
- `offerItems` - Special offers array

### Global Styles
**File:** `app/globals.css`

**Contains:**
- Tailwind directives
- Custom component classes
- Typography classes
- Utility classes

---

## Environment Variables

### Required Variables

**File:** `.env` (gitignored)

```bash
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

**Access in Code:**
```typescript
const apiKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
```

**Important Notes:**
- Prefix with `EXPO_PUBLIC_` for client-side access
- Never commit `.env` to version control
- Document required variables for team
- Use different values for dev/staging/prod

### Supabase Configuration

**URL:** `https://ymljkhdpuaieivqcwrum.supabase.co`

**Required Permissions:**
- Auth API access
- User metadata read/write
- Real-time subscriptions (if used)

---

## Common Tasks

### Adding a New Dependency

```bash
# Install package
npm install package-name

# Install types (if needed)
npm install -D @types/package-name

# Update app
# Expo will auto-detect and prompt to install
```

### Creating a Custom Hook

```typescript
// hooks/useCustomHook.ts
import { useState, useEffect } from 'react';

export function useCustomHook(param: string) {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // Logic
  }, [param]);

  return { state, setState };
}
```

**Usage:**
```typescript
import { useCustomHook } from '@/hooks/useCustomHook';

const { state } = useCustomHook('value');
```

### Adding Icons

1. **Place Icon:** Save to `assets/icons/iconName.png`

2. **Update Constants:**
```typescript
// constans/index.ts
export const icons = {
  ...existingIcons,
  iconName: require('../assets/icons/iconName.png'),
};
```

3. **Use in Components:**
```typescript
import { icons } from '@/constans';

<Image source={icons.iconName} className="w-6 h-6" />
```

### Adding Images

1. **Place Image:** Save to `assets/images/imageName.png`

2. **Update Constants:**
```typescript
// constans/index.ts
export const images = {
  ...existingImages,
  imageName: require('../assets/images/imageName.png'),
};
```

3. **Use in Components:**
```typescript
import { images } from '@/constans';

<Image source={images.imageName} className="w-full h-40" />
```

### Handling Forms

**Pattern:**
```typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async () => {
  try {
    // Validate
    if (!formData.field1) {
      Alert.alert('Error', 'Field 1 is required');
      return;
    }

    // Submit
    await submitAction(formData);

    // Success
    Alert.alert('Success', 'Form submitted');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

### Debugging

**Expo Dev Tools:**
```bash
# Start with dev client
npm start

# Press 'j' to open debugger
# Press 'r' to reload
# Press 'm' to toggle menu
```

**Console Logging:**
```typescript
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Warning:', message);
```

**React Native Debugger:**
- Install React Native Debugger app
- Enable debug mode in Expo menu
- Inspect components and state

### Performance Optimization

**List Optimization:**
```typescript
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

**Memo Components:**
```typescript
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // Return true to skip re-render
});
```

**Callback Optimization:**
```typescript
const handlePress = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

---

## Best Practices

### Do's ✅

- Use TypeScript for all new code
- Define interfaces for all props
- Use Tailwind classes for styling
- Extract reusable logic into hooks
- Use Zustand for shared state
- Handle errors gracefully
- Add loading states
- Use SafeAreaView for screens
- Follow naming conventions
- Keep components small and focused
- Use path alias `@/` for imports
- Add comments for complex logic
- Test on multiple devices

### Don'ts ❌

- Don't use `any` type
- Don't commit `.env` files
- Don't hardcode sensitive data
- Don't ignore TypeScript errors
- Don't skip error handling
- Don't use inline styles unless dynamic
- Don't create deeply nested components
- Don't forget loading/error states
- Don't mix styling approaches
- Don't duplicate code
- Don't ignore accessibility
- Don't skip console cleanup
- Don't commit broken code

---

## Troubleshooting

### Common Issues

**Metro Bundler Cache:**
```bash
npm start -- --clear
```

**Module Not Found:**
```bash
rm -rf node_modules
npm install
```

**TypeScript Errors:**
```bash
# Check for errors
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

**Expo Updates:**
```bash
# Update Expo CLI
npm install -g expo-cli

# Update Expo SDK
npx expo install expo@latest
```

**iOS Build Issues:**
```bash
cd ios
pod install
cd ..
npm run ios
```

**Android Build Issues:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

---

## Future Development

### Planned Features (Placeholders)

1. **Search Functionality** (`app/(tabs)/search.tsx`)
   - Search bar implementation
   - Filter options
   - Search results display
   - Search history

2. **Shopping Cart** (`app/(tabs)/cart.tsx`)
   - Add to cart functionality
   - Cart item management
   - Quantity adjustment
   - Checkout flow

3. **Additional Features:**
   - Restaurant details
   - Menu browsing
   - Order tracking
   - Order history
   - Favorites
   - Reviews and ratings
   - Payment integration
   - Push notifications

### Recommended Next Steps

1. **Implement Cart Store:**
```typescript
// store/cartStore.ts
interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
```

2. **Create Menu Database Schema:**
```sql
-- Supabase tables
CREATE TABLE restaurants (
  id UUID PRIMARY KEY,
  name TEXT,
  description TEXT,
  image_url TEXT
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT,
  description TEXT,
  price DECIMAL,
  image_url TEXT
);
```

3. **Implement Search:**
- Full-text search in Supabase
- Debounced search input
- Filter by category, price, rating
- Search history tracking

---

## Additional Resources

### Documentation Links
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- [Expo Discord](https://chat.expo.dev)
- [React Native Discord](https://www.reactnative.dev/community/overview)
- [Supabase Discord](https://discord.supabase.com/)

---

## Document Maintenance

**Last Updated:** 2025-11-15

**Update When:**
- New features added
- Architecture changes
- New conventions adopted
- Major dependency updates
- Team grows and needs onboarding docs

**Maintained By:** Development Team

---

*This document is designed to help AI assistants understand and work effectively with this codebase. Keep it updated as the project evolves.*
