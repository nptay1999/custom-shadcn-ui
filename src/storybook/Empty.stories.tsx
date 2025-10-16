import type { Meta, StoryObj } from '@storybook/react-vite'
import Empty, {
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '@/components/ui/Empty'
import Button from '@/components/ui/Button'
import {
  FileIcon,
  FolderIcon,
  SearchIcon,
  InboxIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  BellIcon,
  MessageSquareIcon,
  StarIcon,
  DatabaseIcon,
  CloudIcon,
  ImageIcon,
  MailIcon,
  ClipboardIcon,
  AlertCircleIcon,
  PlusCircleIcon,
} from 'lucide-react'

const meta = {
  title: 'UI/Empty',
  component: Empty,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

// ==================== Basic Examples ====================

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          There are no items to display at this time.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithIconVariant: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          There are no items to display at this time.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithDefaultMediaVariant: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <InboxIcon className="size-16 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          There are no items to display at this time.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileIcon />
        </EmptyMedia>
        <EmptyTitle>No documents</EmptyTitle>
        <EmptyDescription>
          Get started by creating a new document.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusCircleIcon />
          Create Document
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithMultipleActions: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Start by creating a new project or importing an existing one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <PlusCircleIcon />
            New Project
          </Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}

export const WithLink: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn't find what you're looking for.{' '}
          <a href="#">Try different keywords</a> or{' '}
          <a href="#">browse all items</a>.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

// ==================== Different Use Cases ====================

export const NoSearchResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn't find any results for your search. Try adjusting your
          filters or search terms.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear Filters</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const EmptyInbox: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <InboxIcon className="size-20 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Inbox is empty</EmptyTitle>
        <EmptyDescription>
          You're all caught up! No new messages at the moment.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const NoNotifications: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>
          You don't have any notifications right now. Check back later!
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const EmptyShoppingCart: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <ShoppingCartIcon className="size-24 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Looks like you haven't added anything to your cart yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="lg">Start Shopping</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoMessages: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          Start a conversation by sending your first message.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusCircleIcon />
          New Message
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoFavorites: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <StarIcon />
        </EmptyMedia>
        <EmptyTitle>No favorites</EmptyTitle>
        <EmptyDescription>
          Items you mark as favorite will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const NoTeamMembers: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersIcon />
        </EmptyMedia>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>
          Get started by inviting team members to collaborate with you.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusCircleIcon />
          Invite Team Member
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoData: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DatabaseIcon />
        </EmptyMedia>
        <EmptyTitle>No data available</EmptyTitle>
        <EmptyDescription>
          There is no data to display. Data will appear here once it becomes
          available.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Refresh</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoImages: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <ImageIcon className="size-20 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No images uploaded</EmptyTitle>
        <EmptyDescription>
          Upload your first image to get started with your gallery.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusCircleIcon />
          Upload Image
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoOrders: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageIcon />
        </EmptyMedia>
        <EmptyTitle>No orders yet</EmptyTitle>
        <EmptyDescription>
          You haven't placed any orders. Start shopping to see your orders here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Browse Products</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoEmails: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailIcon />
        </EmptyMedia>
        <EmptyTitle>No emails</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New emails will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const EmptyClipboard: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClipboardIcon />
        </EmptyMedia>
        <EmptyTitle>Clipboard is empty</EmptyTitle>
        <EmptyDescription>
          Copy items to see them appear in your clipboard history.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const NoCloudFiles: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <CloudIcon className="size-20 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No files in cloud storage</EmptyTitle>
        <EmptyDescription>
          Upload files to access them from anywhere, anytime.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <PlusCircleIcon />
            Upload File
          </Button>
          <Button variant="outline">Create Folder</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}

// ==================== Different Sizes ====================

export const CompactSize: Story = {
  render: () => (
    <Empty className="p-4 md:p-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>No items to display.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const LargeSize: Story = {
  render: () => (
    <Empty className="p-12 md:p-20">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <InboxIcon className="size-32 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl">No items found</EmptyTitle>
        <EmptyDescription className="text-base">
          We couldn't find any items matching your criteria. Try adjusting your
          search or filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-3">
          <Button size="lg">
            <PlusCircleIcon />
            Add New Item
          </Button>
          <Button variant="outline" size="lg">
            Clear Filters
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}

// ==================== Within Containers ====================

export const InCard: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          View your recent actions and events
        </p>
      </div>
      <div className="p-6 pt-0">
        <Empty className="border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClipboardIcon />
            </EmptyMedia>
            <EmptyTitle>No recent activity</EmptyTitle>
            <EmptyDescription>
              Your activity will appear here once you start using the platform.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  ),
}

export const InTable: Story = {
  render: () => (
    <div className="w-full max-w-4xl rounded-md border border-border">
      <div className="relative w-full overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b border-border transition-colors">
              <th className="h-10 px-2 text-left align-middle font-medium">
                Name
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium">
                Status
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium">
                Date
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <Empty className="border-0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <DatabaseIcon />
          </EmptyMedia>
          <EmptyTitle>No records found</EmptyTitle>
          <EmptyDescription>
            There are no records to display in this table.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Add Record
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
}

// ==================== All Variants Showcase ====================

export const AllIconVariants: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>Icon Variant</EmptyTitle>
          <EmptyDescription>Small icon in a rounded box</EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <InboxIcon className="size-16 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Default Variant</EmptyTitle>
          <EmptyDescription>Larger icon without background</EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
              <InboxIcon className="size-10 text-primary" />
            </div>
          </EmptyMedia>
          <EmptyTitle>Custom Style</EmptyTitle>
          <EmptyDescription>Custom styled media element</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  ),
}

export const AllUseCases: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <Empty className="p-6">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon />
          </EmptyMedia>
          <EmptyTitle className="text-base">No Results</EmptyTitle>
          <EmptyDescription className="text-xs">
            Try different keywords
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty className="p-6">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle className="text-base">Empty Inbox</EmptyTitle>
          <EmptyDescription className="text-xs">
            You're all caught up
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty className="p-6">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCartIcon />
          </EmptyMedia>
          <EmptyTitle className="text-base">Empty Cart</EmptyTitle>
          <EmptyDescription className="text-xs">
            Add items to cart
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty className="p-6">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <StarIcon />
          </EmptyMedia>
          <EmptyTitle className="text-base">No Favorites</EmptyTitle>
          <EmptyDescription className="text-xs">
            Mark items as favorite
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  ),
}
