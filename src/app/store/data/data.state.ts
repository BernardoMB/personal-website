export interface DataState {
  initials: string,
  fullname: string;
  email: string;
  phoneNumer: string;
  address: string;
}

export const initialDataState: DataState = {
  initials: 'BMB',
  fullname: 'Bernardo Mondragón Brozon',
  email: 'bmondragonbrozon@gmail.com',
  phoneNumer: '525535592033',
  address: 'Paseo San Agustin 78, Lomas Verdes, Naucalpan, Edo. México, Mexico, CP. 53120'
};
