
export const handleError = (req, res, err) => {
  console.error(err)
  return res.status(500).send({
	message: "err",
	data: {
	  errors: [err.message]
	}
  })
}

