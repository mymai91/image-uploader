import { moduleMetadata, Meta, StoryObj, StoryFn } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { ImageListComponent } from '../components/image-list/image-list.component'
import { action } from '@storybook/addon-actions'

const meta: Meta<ImageListComponent> = {
  title: 'Components/ImageList',
  component: ImageListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    images: { control: 'object' },
    isActive: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<ImageListComponent>

const Template: Story = {
  render: args => ({
    props: {
      ...args,
      onDelete: { emit: action('onDelete') },
      onRestore: { emit: action('onRestore') },
    },
  }),
}

export const ActiveImages: Story = {
  ...Template,
  args: {
    title: 'Active Images',
    images: [
      {
        id: 1,
        filename: 'sample-image-1.jpg',
        path: 'https://via.placeholder.com/150',
        description: 'Sample Image 1',
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      },
      {
        id: 2,
        filename: 'sample-image-2.jpg',
        path: 'https://via.placeholder.com/150',
        description: 'Sample Image 2',
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      },
    ],
    isActive: true,
    noImagesMessage: 'No images available.',
  },
}

export const InactiveImages: Story = {
  ...Template,
  args: {
    title: 'Inactive Images',
    images: [
      {
        id: 3,
        filename: 'sample-image-3.jpg',
        path: 'https://via.placeholder.com/150',
        description: 'Sample Image 3',
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      },
    ],
    isActive: false,
    noImagesMessage: 'No images available.',
  },
}
