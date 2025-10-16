import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// ==================== Basic States ====================

export const Default: Story = {
  args: {
    'aria-label': 'Default checkbox',
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Checked checkbox',
  },
}

export const Unchecked: Story = {
  args: {
    defaultChecked: false,
    'aria-label': 'Unchecked checkbox',
  },
}

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Indeterminate checkbox',
  },
}

// ==================== Disabled States ====================

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Disabled checked checkbox',
  },
}

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    checked: 'indeterminate',
    'aria-label': 'Disabled indeterminate checkbox',
  },
}

// ==================== With Labels ====================

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const WithLabelChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-checked" defaultChecked />
      <label
        htmlFor="terms-checked"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const WithLabelDisabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-disabled" disabled defaultChecked />
      <label
        htmlFor="terms-disabled"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const WithDescriptionText: Story = {
  render: () => (
    <div className="flex items-start space-x-2">
      <Checkbox id="marketing" className="mt-0.5" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="marketing"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Marketing emails
        </label>
        <p className="text-sm text-muted-foreground">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
}

// ==================== Interactive Controlled ====================

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label
            htmlFor="controlled"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Controlled checkbox
          </label>
        </div>
        <div className="text-sm text-muted-foreground">
          State:{' '}
          {checked === 'indeterminate'
            ? 'Indeterminate'
            : checked
              ? 'Checked'
              : 'Unchecked'}
        </div>
      </div>
    )
  },
}

export const ControlledIndeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(
      'indeterminate'
    )

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled-indeterminate"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label
            htmlFor="controlled-indeterminate"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Click to toggle states
          </label>
        </div>
        <div className="text-sm text-muted-foreground">
          State:{' '}
          {checked === 'indeterminate'
            ? 'Indeterminate'
            : checked
              ? 'Checked'
              : 'Unchecked'}
        </div>
      </div>
    )
  },
}

// ==================== Form Integration ====================

export const WithFormName: Story = {
  args: {
    name: 'newsletter',
    value: 'subscribe',
    'aria-label': 'Subscribe to newsletter',
  },
}

export const Required: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="required" required />
      <label
        htmlFor="required"
        className="text-sm font-medium leading-none cursor-pointer"
      >
        I agree to the terms <span className="text-destructive">*</span>
      </label>
    </div>
  ),
}

// ==================== Multiple Checkboxes ====================

export const CheckboxGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="font-medium text-sm mb-1">Select your interests:</div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest-1" defaultChecked />
        <label htmlFor="interest-1" className="text-sm cursor-pointer">
          Technology
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest-2" />
        <label htmlFor="interest-2" className="text-sm cursor-pointer">
          Design
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest-3" defaultChecked />
        <label htmlFor="interest-3" className="text-sm cursor-pointer">
          Business
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest-4" />
        <label htmlFor="interest-4" className="text-sm cursor-pointer">
          Marketing
        </label>
      </div>
    </div>
  ),
}

export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: false },
      { id: 3, label: 'Item 3', checked: false },
    ])

    const allChecked = items.every(item => item.checked)
    const someChecked = items.some(item => item.checked)
    const isIndeterminate = someChecked && !allChecked

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
      setItems(items.map(item => ({ ...item, checked: checked === true })))
    }

    const handleItemChange = (
      id: number,
      checked: boolean | 'indeterminate'
    ) => {
      setItems(
        items.map(item =>
          item.id === id ? { ...item, checked: checked === true } : item
        )
      )
    }

    return (
      <div className="flex flex-col gap-3 p-4 border border-border rounded-md">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Checkbox
            id="select-all"
            checked={isIndeterminate ? 'indeterminate' : allChecked}
            onCheckedChange={handleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium cursor-pointer"
          >
            Select All
          </label>
        </div>
        {items.map(item => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`item-${item.id}`}
              checked={item.checked}
              onCheckedChange={checked => handleItemChange(item.id, checked)}
            />
            <label
              htmlFor={`item-${item.id}`}
              className="text-sm cursor-pointer"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    )
  },
}

// ==================== Real-world Examples ====================

export const TermsAndConditions: Story = {
  render: () => (
    <div className="max-w-md p-4 border border-border rounded-md space-y-4">
      <h3 className="font-semibold">Create Account</h3>
      <div className="flex items-start space-x-2">
        <Checkbox id="terms-real" className="mt-1" required />
        <label htmlFor="terms-real" className="text-sm cursor-pointer">
          I agree to the{' '}
          <a href="#" className="text-primary underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary underline">
            Privacy Policy
          </a>
          <span className="text-destructive"> *</span>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter-real" />
        <label htmlFor="newsletter-real" className="text-sm cursor-pointer">
          Send me promotional emails
        </label>
      </div>
    </div>
  ),
}

export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Review pull requests', completed: true },
      { id: 2, text: 'Write documentation', completed: false },
      { id: 3, text: 'Update dependencies', completed: false },
      { id: 4, text: 'Deploy to production', completed: true },
    ])

    const toggleTodo = (id: number) => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    }

    return (
      <div className="w-80 p-4 border border-border rounded-md space-y-3">
        <h3 className="font-semibold mb-3">Todo List</h3>
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center space-x-2">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm cursor-pointer flex-1 ${
                todo.completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {todo.text}
            </label>
          </div>
        ))}
      </div>
    )
  },
}

export const SettingsPanel: Story = {
  render: () => (
    <div className="w-96 p-4 border border-border rounded-md space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Notification Settings</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="email-notif" defaultChecked className="mt-0.5" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="email-notif"
                className="text-sm font-medium cursor-pointer"
              >
                Email notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="push-notif" defaultChecked className="mt-0.5" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="push-notif"
                className="text-sm font-medium cursor-pointer"
              >
                Push notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your device
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="sms-notif" className="mt-0.5" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="sms-notif"
                className="text-sm font-medium cursor-pointer"
              >
                SMS notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ==================== All States Showcase ====================

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="font-semibold mb-3 text-sm">Basic States</h3>
        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="state-unchecked" />
            <label htmlFor="state-unchecked" className="text-sm cursor-pointer">
              Unchecked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="state-checked" defaultChecked />
            <label htmlFor="state-checked" className="text-sm cursor-pointer">
              Checked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="state-indeterminate" checked="indeterminate" />
            <label
              htmlFor="state-indeterminate"
              className="text-sm cursor-pointer"
            >
              Indeterminate
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Disabled States</h3>
        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-unchecked" disabled />
            <label htmlFor="disabled-unchecked" className="text-sm">
              Disabled
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <label htmlFor="disabled-checked" className="text-sm">
              Disabled Checked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="disabled-indeterminate"
              disabled
              checked="indeterminate"
            />
            <label htmlFor="disabled-indeterminate" className="text-sm">
              Disabled Indeterminate
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
}
