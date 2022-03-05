import replaceAll from "./data_types";

const getStatements = (options?: {
  per_page?: number;
  page?: number;
  to?: string;
  from?: string;
  auth: Promise<any>;
}) => {
  return new Promise((resolve, reject) => {
    options?.auth.then((user: any) => {
      const data = typeof options == 'object' ? options : {};
      const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join();
      const url = `https://apiv2.shiprocket.in/v1/external/account/details/statement?` + replaceAll(full_url, ',', '&');
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'apllication/json',
          'Accept': 'apllication/json',
          'Authorization': "Bearer " + user?.token
        }
      }).then((res) => res.json()).then((result) => {
        if (result?.data?.length) {
          return resolve([...result?.data]);
        }
        return reject(result);
      }).catch((error) => reject(error))
    }).catch((error) => reject(error))
  })
}

export default getStatements;