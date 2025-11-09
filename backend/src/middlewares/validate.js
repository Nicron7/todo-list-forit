export function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({
          message: "Invalid data",
          error: error.errors?.map((e) => e.message) ?? [],
        });
    }
  };
}
