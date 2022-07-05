async function verifywithjwt (token){
  try {
  const decoded = jwt.verify(token, secret);
  console.log({ secret, token, decoded });
  const returnofjwtverify = { success:true, decoded };
  return returnofjwtverify;
} catch (error) {
  console.log({
    message: "some error occured :)",
    errormessage: error.message,
  });
  const returnofcatchjwtverify = { success:false };
  return returnofcatchjwtverify;
}
}
module.exports = { verifywithjwt };