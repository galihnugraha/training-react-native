import ICONS from "../../assets/icons"
import IMAGES from "../../assets/images"

const ProfileID = [
  {
    name: 'ID',
    value: 'A20134',
  },
  {
    name: 'Email',
    value: 'siapanamanyayah@gmail.com',
  },
  // {
  //   name: 'Date of Birth',
  //   value: '3 May 1999',
  // },
  // {
  //   name: 'Gender',
  //   value: 'Male',
  // },
  {
    name: 'NIK',
    value: '12345',
  },
  {
    name: 'Phone',
    value: '0123456789',
  },
]

const People = [
  {avatar: IMAGES.person3},
  {avatar: IMAGES.person6},
  {avatar: IMAGES.person10}
]

const Options = [
  {
    icon: ICONS.privacy,
    color: '#CED1D4',
    name: 'Privacy and Security'
  },
  {
    icon: ICONS.help,
    color: '#FDE180',
    name: 'Help'
  },
  {
    icon: ICONS.about,
    color: '#E6E2FF',
    name: 'About Us'
  },
  {
    icon: ICONS.logout,
    color: '#EF9F9F',
    name: 'Logout'
  },  
]

export { ProfileID, People, Options }