import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {
  SearchIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'file',
        'color',
      ],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// ==================== Basic Types ====================

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
    min: 0,
    max: 100,
  },
}

export const Tel: Story = {
  args: {
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
  },
}

export const URL: Story = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const Date: Story = {
  args: {
    type: 'date',
  },
}

export const Time: Story = {
  args: {
    type: 'time',
  },
}

export const DateTime: Story = {
  args: {
    type: 'datetime-local',
  },
}

export const Color: Story = {
  args: {
    type: 'color',
    defaultValue: '#3b82f6',
  },
}

export const File: Story = {
  args: {
    type: 'file',
  },
}

export const FileMultiple: Story = {
  args: {
    type: 'file',
    multiple: true,
    accept: 'image/*',
  },
}

// ==================== States ====================

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'This input is disabled',
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    defaultValue: 'This input is read-only',
    readOnly: true,
  },
}

export const Required: Story = {
  args: {
    placeholder: 'Required field',
    required: true,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Default value',
  },
}

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true,
    defaultValue: 'invalid@',
  },
}

// ==================== With Labels ====================

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium leading-none">
        Email
      </label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const WithLabelAndHelper: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email-2" className="text-sm font-medium leading-none">
        Email
      </label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">
        We'll never share your email with anyone else.
      </p>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email-3" className="text-sm font-medium leading-none">
        Email
      </label>
      <Input
        type="email"
        id="email-3"
        placeholder="Email"
        aria-invalid="true"
        defaultValue="invalid-email"
      />
      <p className="text-sm text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  ),
}

export const RequiredWithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="name" className="text-sm font-medium leading-none">
        Name <span className="text-destructive">*</span>
      </label>
      <Input id="name" placeholder="Enter your name" required />
      <p className="text-sm text-muted-foreground">This field is required</p>
    </div>
  ),
}

// ==================== With Icons ====================

export const WithLeftIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="size-4 text-muted-foreground" />
      </div>
      <Input className="pl-9" placeholder="Search..." />
    </div>
  ),
}

export const WithRightIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Input className="pr-9" placeholder="Enter email..." type="email" />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <MailIcon className="size-4 text-muted-foreground" />
      </div>
    </div>
  ),
}

export const WithBothIcons: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <UserIcon className="size-4 text-muted-foreground" />
      </div>
      <Input className="px-9" placeholder="Username" />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-sm text-muted-foreground">@</span>
      </div>
    </div>
  ),
}

export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative w-full max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <LockIcon className="size-4 text-muted-foreground" />
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="px-9"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <EyeOffIcon className="size-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="size-4 text-muted-foreground" />
          )}
        </button>
      </div>
    )
  },
}

// ==================== With Buttons ====================

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
}

export const WithButtonInside: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Input className="pr-24" placeholder="Enter your email..." type="email" />
      <Button size="sm" className="absolute right-1 top-1 h-7">
        Subscribe
      </Button>
    </div>
  ),
}

export const SearchWithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="size-4 text-muted-foreground" />
        </div>
        <Input className="pl-9" placeholder="Search..." />
      </div>
      <Button variant="outline">Search</Button>
    </div>
  ),
}

// ==================== Sizes ====================

export const SmallSize: Story = {
  render: () => <Input className="h-8 text-xs" placeholder="Small input" />,
}

export const DefaultSize: Story = {
  render: () => <Input className="h-9" placeholder="Default input" />,
}

export const LargeSize: Story = {
  render: () => <Input className="h-11 text-base" placeholder="Large input" />,
}

// ==================== Form Examples ====================

export const LoginForm: Story = {
  render: () => (
    <form className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium leading-none"
        >
          Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MailIcon className="size-4 text-muted-foreground" />
          </div>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="text-sm font-medium leading-none"
        >
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LockIcon className="size-4 text-muted-foreground" />
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            className="pl-9"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  ),
}

export const SignUpForm: Story = {
  render: () => (
    <form className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="signup-name"
          className="text-sm font-medium leading-none"
        >
          Full Name <span className="text-destructive">*</span>
        </label>
        <Input id="signup-name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="signup-email"
          className="text-sm font-medium leading-none"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="signup-password"
          className="text-sm font-medium leading-none"
        >
          Password <span className="text-destructive">*</span>
        </label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          required
        />
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  ),
}

export const AddressForm: Story = {
  render: () => (
    <form className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="address-street"
          className="text-sm font-medium leading-none"
        >
          Street Address
        </label>
        <Input id="address-street" placeholder="123 Main St" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="address-city"
            className="text-sm font-medium leading-none"
          >
            City
          </label>
          <Input id="address-city" placeholder="New York" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address-state"
            className="text-sm font-medium leading-none"
          >
            State
          </label>
          <Input id="address-state" placeholder="NY" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="address-zip"
            className="text-sm font-medium leading-none"
          >
            ZIP Code
          </label>
          <Input id="address-zip" placeholder="10001" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address-country"
            className="text-sm font-medium leading-none"
          >
            Country
          </label>
          <Input id="address-country" placeholder="USA" />
        </div>
      </div>
    </form>
  ),
}

export const PaymentForm: Story = {
  render: () => (
    <form className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="card-number"
          className="text-sm font-medium leading-none"
        >
          Card Number
        </label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="expiry" className="text-sm font-medium leading-none">
            Expiry Date
          </label>
          <Input id="expiry" placeholder="MM/YY" maxLength={5} />
        </div>

        <div className="space-y-2">
          <label htmlFor="cvc" className="text-sm font-medium leading-none">
            CVC
          </label>
          <Input id="cvc" placeholder="123" maxLength={3} />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="cardholder"
          className="text-sm font-medium leading-none"
        >
          Cardholder Name
        </label>
        <Input id="cardholder" placeholder="John Doe" />
      </div>
    </form>
  ),
}

// ==================== Controlled ====================

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div className="w-full max-w-sm space-y-2">
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p className="text-sm text-muted-foreground">
          You typed: <span className="font-medium">{value || '(nothing)'}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Character count: {value.length}
        </p>
      </div>
    )
  },
}

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const maxLength = 20

    return (
      <div className="w-full max-w-sm space-y-2">
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Max 20 characters"
          maxLength={maxLength}
        />
        <p className="text-sm text-muted-foreground">
          {value.length}/{maxLength} characters
        </p>
      </div>
    )
  },
}

// ==================== Showcase ====================

export const AllTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text</label>
        <Input type="text" placeholder="Text input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="Email input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input type="password" placeholder="Password input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Number</label>
        <Input type="number" placeholder="Number input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tel</label>
        <Input type="tel" placeholder="Phone input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">URL</label>
        <Input type="url" placeholder="URL input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input type="date" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Time</label>
        <Input type="time" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <Input type="color" defaultValue="#3b82f6" />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">File</label>
        <Input type="file" />
      </div>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <Input placeholder="Default input" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">With Value</label>
        <Input defaultValue="Input with value" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <Input placeholder="Disabled input" disabled />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Read-only</label>
        <Input defaultValue="Read-only input" readOnly />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Required <span className="text-destructive">*</span>
        </label>
        <Input placeholder="Required input" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Invalid</label>
        <Input
          placeholder="Invalid input"
          aria-invalid="true"
          defaultValue="invalid@"
        />
        <p className="text-sm text-destructive">This field has an error</p>
      </div>
    </div>
  ),
}
