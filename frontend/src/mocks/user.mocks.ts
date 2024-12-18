import { BTUser } from "@/types/user.types";

const userMock: BTUser = {
  id: "4d5db4fc-40d4-4b2a-8a28-d15b8b024fb7",
  email: "joel@test.com",
  name: "joel",
  role: "vendor",
  jwtToken: "somefaketoken",
  profileImg: {
    id: "a1ea94ba-4e95-4f63-be60-36d265dd6dc9",
    fileType: "image",
    fileMetadata: {
      size: 0,
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      alt: "",
      height: 60,
      format: "webp",
      mimeType: "image/webp",
      created_at: new Date("2024-12-04T05:47:09Z")
    }
  },
  seller: {
    id: "8879db58-fb5d-41b0-b0a0-686e1a8d2bdd",
    type: "desarrollador-de-apps",
    about: "Experto en desarrollo de aplicaciones no-code con más de 5 años de experiencia en AppSheet y Power Apps, ayudando a empresas y emprendedores.",
    website: null,
    documentImg: null,
    paymentMethod: null
  }
};

export default userMock
