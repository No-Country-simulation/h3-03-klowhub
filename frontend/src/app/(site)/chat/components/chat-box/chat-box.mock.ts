import { TImage } from "@/types/global.types"

const contactsMock = [
  {
    id: "a1ea94ba-4e95-4f63-be60-36d265dd6dc9",
    name: "Jhon Doe",
    profileImg: {
      id: "a1ea94ba-4e95-4f63-be60-36d265dd6dc9",
      fileType: "image",
      fileMetadata: {
        size: 0,
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        format: "webp",
        mimeType: "image/webp",
        created_at: new Date ("2024-12-04T05:47:09Z"),
        alt: ""
      }
    } as TImage,
    messages: [
      { content: "olak ase", userId: "12" },
      { content: "olak ase", userId: "12" },
    ]
  },
  {
    id: "a1ea94ba-4e95sad-4f63-be60-36d265ddasddc9",
    name: "Maria Antonieta",
    profileImg: {
      id: "a1ea94ba-4e95-4f63-be60-36d265dd6dc9",
      fileType: "image",
      fileMetadata: {
        size: 0,
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        format: "webp",
        mimeType: "image/webp",
        created_at: new Date("2024-12-04T05:47:09Z"),
        alt: ""
      }
    },
    messages: [
      { content: "olak ase", userId: "12" },
      { content: "olak ase", userId: "12" },
    ]
  },
  {
    id: "342hkjd-4asdas95sad-21adahjkf63-be60-qasd32198",
    name: "Malena",
    profileImg: {
      id: "a1ea94ba-4e95-4f63-be60-36d265dd6dc9",
      fileType: "image",
      fileMetadata: {
        size: 0,
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        format: "webp",
        mimeType: "image/webp",
        created_at: new Date("2024-12-04T05:47:09Z"),
        alt: ""
      }
    },
    messages: [
      { content: "olak ase", userId: "12" },
      { content: "olak ase", userId: "12" },
    ]
  }
]

export default contactsMock
