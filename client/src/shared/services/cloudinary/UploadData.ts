// const UploadDatas = async (result: any) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("timestamp", sigRes.data.timestamp);
//     formData.append("signature", sigRes.data.signature);
//     formData.append("api_key", sigRes.data.apiKey);
//     formData.append("folder", "kyc/pan");

//     const uploadRes = await fetch(
//         `https://api.cloudinary.com/v1_1/${sigRes.data.cloudName}/image/upload`,
//         { method: "POST", body: formData }
//     );

//     const uploaded = await uploadRes.json();
// }