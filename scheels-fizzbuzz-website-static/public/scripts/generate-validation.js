export function validateGenerateInputs(min, max, textThree, textFive) {
  const maxIterations = 100000;
  const errors = [];

  if (isNaN(min)) 
    errors.push(`Min must be a number.`);
  if (isNaN(max)) 
    errors.push(`Max must be a number.`);
  if (parseInt(min) > parseInt(max))
    errors.push("Min must be less than or equal to Max.");
  if (!textThree.trim())
    errors.push("Text for x3 (e.g. 'SCHEELS') cannot be empty.");
  if (!textFive.trim())
    errors.push("Text for x5 (e.g. '.COM') cannot be empty.");
  if (max - min + 1 > maxIterations)
    errors.push(`Range passed was too large. Please limit range to ${maxIterations}.`)

  return errors;
}
