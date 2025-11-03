import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusIcon, TrashIcon, XIcon } from 'lucide-react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@ui/Form/Field'
import Input from '@ui/Input'
import Button from '@ui/Button'
import Checkbox from '@ui/Checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/Select'

const meta = {
  title: 'UI/Form',
  component: Field,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

// ==================== Basic Form ====================
const basicFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  bio: z.string().optional(),
  subscribe: z.boolean(),
})

type BasicFormData = z.infer<typeof basicFormSchema>

export const BasicForm: Story = {
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<BasicFormData>({
      resolver: zodResolver(basicFormSchema),
      defaultValues: {
        subscribe: false,
      },
    })

    const onSubmit = async (data: BasicFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                {...register('username')}
                aria-invalid={!!errors.username}
              />
              <FieldError errors={[errors.username]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              <FieldDescription>
                We'll never share your email with anyone else.
              </FieldDescription>
              <FieldError errors={[errors.email]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register('password')}
                aria-invalid={!!errors.password}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Input
                id="bio"
                {...register('bio')}
                placeholder="Tell us about yourself"
              />
              <FieldDescription>
                Brief description for your profile.
              </FieldDescription>
            </Field>

            <Field orientation="horizontal">
              <Checkbox id="subscribe" {...register('subscribe')} />
              <FieldLabel htmlFor="subscribe">
                Subscribe to newsletter
              </FieldLabel>
            </Field>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  },
}

// ==================== Dynamic Form (Array Fields) ====================
const dynamicFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  emails: z
    .array(
      z.object({
        value: z.string().email('Invalid email address'),
      })
    )
    .min(1, 'At least one email is required'),
})

type DynamicFormData = z.infer<typeof dynamicFormSchema>

export const DynamicForm: Story = {
  render: () => {
    const {
      register,
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<DynamicFormData>({
      resolver: zodResolver(dynamicFormSchema),
      defaultValues: {
        name: '',
        emails: [{ value: '' }],
      },
    })

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'emails',
    })

    const onSubmit = async (data: DynamicFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Dynamic Email List</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                {...register('name')}
                aria-invalid={!!errors.name}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <FieldSeparator>Email Addresses</FieldSeparator>

            {fields.map((field, index) => (
              <Field key={field.id} orientation="horizontal">
                <div className="flex-1">
                  <Input
                    {...register(`emails.${index}.value`)}
                    placeholder={`Email ${index + 1}`}
                    aria-invalid={!!errors.emails?.[index]?.value}
                  />
                  <FieldError errors={[errors.emails?.[index]?.value]} />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                )}
              </Field>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ value: '' })}
              className="w-full"
            >
              <PlusIcon />
              Add Email
            </Button>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  },
}

// ==================== Conditional Form ====================
const conditionalFormSchema = z.object({
  accountType: z.enum(['personal', 'business']),
  email: z.string().email('Invalid email address'),
  // Personal fields
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  // Business fields
  companyName: z.string().optional(),
  taxId: z.string().optional(),
  numberOfEmployees: z.string().optional(),
})

type ConditionalFormData = z.infer<typeof conditionalFormSchema>

export const ConditionalForm: Story = {
  render: () => {
    const {
      register,
      control,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<ConditionalFormData>({
      resolver: zodResolver(conditionalFormSchema),
      defaultValues: {
        accountType: 'personal',
      },
    })

    const accountType = watch('accountType')

    const onSubmit = async (data: ConditionalFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Account Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="accountType">Account Type</FieldLabel>
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="accountType" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>
                Select the type of account you want to create
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            {accountType === 'personal' && (
              <>
                <FieldSeparator>Personal Information</FieldSeparator>

                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    aria-invalid={!!errors.firstName}
                  />
                  <FieldError errors={[errors.firstName]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    aria-invalid={!!errors.lastName}
                  />
                  <FieldError errors={[errors.lastName]} />
                </Field>
              </>
            )}

            {accountType === 'business' && (
              <>
                <FieldSeparator>Business Information</FieldSeparator>

                <Field>
                  <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    aria-invalid={!!errors.companyName}
                  />
                  <FieldError errors={[errors.companyName]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="taxId">Tax ID</FieldLabel>
                  <Input
                    id="taxId"
                    {...register('taxId')}
                    placeholder="XX-XXXXXXX"
                    aria-invalid={!!errors.taxId}
                  />
                  <FieldError errors={[errors.taxId]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="numberOfEmployees">
                    Number of Employees
                  </FieldLabel>
                  <Controller
                    name="numberOfEmployees"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="numberOfEmployees"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201+">201+</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.numberOfEmployees]} />
                </Field>
              </>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  },
}

// ==================== Nested Array Form ====================
const nestedFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  teams: z
    .array(
      z.object({
        teamName: z.string().min(1, 'Team name is required'),
        members: z
          .array(
            z.object({
              name: z.string().min(1, 'Member name is required'),
              role: z.string().min(1, 'Role is required'),
            })
          )
          .min(1, 'At least one member is required'),
      })
    )
    .min(1, 'At least one team is required'),
})

type NestedFormData = z.infer<typeof nestedFormSchema>

export const NestedArrayForm: Story = {
  render: () => {
    const {
      register,
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<NestedFormData>({
      resolver: zodResolver(nestedFormSchema),
      defaultValues: {
        projectName: '',
        teams: [
          {
            teamName: '',
            members: [{ name: '', role: '' }],
          },
        ],
      },
    })

    const {
      fields: teamFields,
      append: appendTeam,
      remove: removeTeam,
    } = useFieldArray({
      control,
      name: 'teams',
    })

    const onSubmit = async (data: NestedFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Project Teams</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
              <Input
                id="projectName"
                {...register('projectName')}
                aria-invalid={!!errors.projectName}
              />
              <FieldError errors={[errors.projectName]} />
            </Field>

            <FieldSeparator>Teams</FieldSeparator>

            {teamFields.map((teamField, teamIndex) => (
              <FieldSet key={teamField.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <FieldLegend variant="label">
                    Team {teamIndex + 1}
                  </FieldLegend>
                  {teamFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeTeam(teamIndex)}
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor={`teams.${teamIndex}.teamName`}>
                      Team Name
                    </FieldLabel>
                    <Input
                      id={`teams.${teamIndex}.teamName`}
                      {...register(`teams.${teamIndex}.teamName`)}
                      aria-invalid={!!errors.teams?.[teamIndex]?.teamName}
                    />
                    <FieldError
                      errors={[errors.teams?.[teamIndex]?.teamName]}
                    />
                  </Field>

                  <TeamMembers
                    control={control}
                    teamIndex={teamIndex}
                    errors={errors}
                    register={register}
                  />
                </FieldGroup>
              </FieldSet>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendTeam({
                  teamName: '',
                  members: [{ name: '', role: '' }],
                })
              }
              className="w-full"
            >
              <PlusIcon />
              Add Team
            </Button>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Create Project'}
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  },
}

// Helper component for nested members
function TeamMembers({ control, teamIndex, errors, register }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `teams.${teamIndex}.members`,
  })

  return (
    <>
      <div className="text-sm font-medium mb-2">Members</div>
      {fields.map((memberField, memberIndex) => (
        <Field key={memberField.id} orientation="horizontal" className="gap-2">
          <div className="flex-1">
            <Input
              {...register(`teams.${teamIndex}.members.${memberIndex}.name`)}
              placeholder="Name"
              aria-invalid={
                !!errors.teams?.[teamIndex]?.members?.[memberIndex]?.name
              }
            />
            <FieldError
              errors={[errors.teams?.[teamIndex]?.members?.[memberIndex]?.name]}
            />
          </div>
          <div className="flex-1">
            <Input
              {...register(`teams.${teamIndex}.members.${memberIndex}.role`)}
              placeholder="Role"
              aria-invalid={
                !!errors.teams?.[teamIndex]?.members?.[memberIndex]?.role
              }
            />
            <FieldError
              errors={[errors.teams?.[teamIndex]?.members?.[memberIndex]?.role]}
            />
          </div>
          {fields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(memberIndex)}
            >
              <TrashIcon />
            </Button>
          )}
        </Field>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => append({ name: '', role: '' })}
        className="w-full"
      >
        <PlusIcon />
        Add Member
      </Button>
    </>
  )
}

// ==================== Multi-Step Form ====================
const step1Schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const step2Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
})

const step3Schema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
})

const multiStepSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type MultiStepFormData = z.infer<typeof multiStepSchema>

export const MultiStepForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1)
    const {
      register,
      handleSubmit,
      trigger,
      formState: { errors, isSubmitting },
    } = useForm<MultiStepFormData>({
      resolver: zodResolver(multiStepSchema),
      mode: 'onTouched',
    })

    const nextStep = async () => {
      let fieldsToValidate: Array<keyof MultiStepFormData> = []

      if (currentStep === 1) {
        fieldsToValidate = ['email', 'password']
      } else if (currentStep === 2) {
        fieldsToValidate = ['firstName', 'lastName', 'phone']
      }

      const isValid = await trigger(fieldsToValidate)
      if (isValid) {
        setCurrentStep(prev => prev + 1)
      }
    }

    const prevStep = () => {
      setCurrentStep(prev => prev - 1)
    }

    const onSubmit = async (data: MultiStepFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-2">Multi-Step Registration</h2>
        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full ${
                step <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Step {currentStep} of 3
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {currentStep === 1 && (
              <>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                  />
                  <FieldError errors={[errors.password]} />
                </Field>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    aria-invalid={!!errors.firstName}
                  />
                  <FieldError errors={[errors.firstName]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    aria-invalid={!!errors.lastName}
                  />
                  <FieldError errors={[errors.lastName]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    aria-invalid={!!errors.phone}
                  />
                  <FieldError errors={[errors.phone]} />
                </Field>
              </>
            )}

            {currentStep === 3 && (
              <>
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    id="address"
                    {...register('address')}
                    aria-invalid={!!errors.address}
                  />
                  <FieldError errors={[errors.address]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    {...register('city')}
                    aria-invalid={!!errors.city}
                  />
                  <FieldError errors={[errors.city]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <Input
                    id="country"
                    {...register('country')}
                    aria-invalid={!!errors.country}
                  />
                  <FieldError errors={[errors.country]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="zipCode">ZIP Code</FieldLabel>
                  <Input
                    id="zipCode"
                    {...register('zipCode')}
                    aria-invalid={!!errors.zipCode}
                  />
                  <FieldError errors={[errors.zipCode]} />
                </Field>
              </>
            )}

            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={currentStep === 1 ? 'w-full' : 'flex-1'}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </div>
    )
  },
}

// ==================== Form with Field Orientations ====================
export const FieldOrientations: Story = {
  render: () => {
    const { register, handleSubmit } = useForm({
      defaultValues: {
        vertical1: '',
        vertical2: '',
        horizontal1: '',
        horizontal2: '',
        agree: false,
        newsletter: false,
      },
    })

    const onSubmit = (data: any) => {
      console.log('Form submitted:', data)
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Field Orientations</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Vertical Fields (Default)</FieldLegend>
              <Field orientation="vertical">
                <FieldLabel htmlFor="vertical1">Vertical Field 1</FieldLabel>
                <Input id="vertical1" {...register('vertical1')} />
                <FieldDescription>
                  This is a vertical field layout
                </FieldDescription>
              </Field>

              <Field orientation="vertical">
                <FieldLabel htmlFor="vertical2">Vertical Field 2</FieldLabel>
                <Input id="vertical2" {...register('vertical2')} />
              </Field>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Horizontal Fields</FieldLegend>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="horizontal1">
                  Horizontal Field 1
                </FieldLabel>
                <Input id="horizontal1" {...register('horizontal1')} />
              </Field>

              <Field orientation="horizontal">
                <FieldLabel htmlFor="horizontal2">
                  Horizontal Field 2
                </FieldLabel>
                <FieldContent>
                  <Input id="horizontal2" {...register('horizontal2')} />
                  <FieldDescription>
                    Horizontal layout with description
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Checkboxes</FieldLegend>
              <Field orientation="horizontal">
                <Checkbox id="agree" {...register('agree')} />
                <FieldLabel htmlFor="agree">
                  I agree to the terms and conditions
                </FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <Checkbox id="newsletter" {...register('newsletter')} />
                <FieldLabel htmlFor="newsletter">
                  <FieldContent>
                    <FieldTitle>Subscribe to newsletter</FieldTitle>
                    <FieldDescription>
                      Get weekly updates about new features
                    </FieldDescription>
                  </FieldContent>
                </FieldLabel>
              </Field>
            </FieldSet>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </FieldGroup>
        </form>
      </div>
    )
  },
}
