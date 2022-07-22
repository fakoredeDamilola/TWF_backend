
type Rule = 
| { type: "equal", value: number | string }
| { type: "notEqual", value: number | string }
| { type: "digits", value: number }
| { type: "min", min: number }
| { type: "max", max: number }
| { type: "positive", positive: number }
| { type: "negative", negative: number }
| { type:"containDigit", value:number | string }
| { type:"containUppercase", value:number | string }
| { type:"containLowercase", value:number | string }
| { type: "decimal", decimal: number }
| { type: "isString", isString: string }
| { type: "isBoolean", isBoolean: string }
| { type: "isNumber", isNumber: string }

type Result<T> = 
| { field: string | null, status: true, message: T }
| { field: string | null, status: false, message: string }

interface IValidator<T> {
    validate(value: unknown, field: string | null): Result<T>;
}


export class Validator implements IValidator<string> {
    constructor(private rules?: Rule[]) {
        if (!Array.isArray(this.rules)) {
            this.rules = [];
        }
    }

    /**
     * Fails if the value being validated is not equal to @param value.
     */
    equals: (value: string | number) => Validator = value => {
        this.rules = this.addRule({ type: "equal", value: value });
        return this;
    }

    /**
    * Fails if the value being validated is not equal to @param value.
    */
    digits: (value: number) => Validator = value => {
        this.rules = this.addRule({ type: "digits", value: value });
        return this;
    }

    /**
     * Fails if the value being validated is not a positive zero.
     */
     positive: () => Validator = () => {
        this.rules = this.addRule({ type: "positive", positive: 0 });
        return this;
    }

    /**
     * Fails if the value being validated is not a negative integer.
     */
    negative: () => Validator = () => {
        this.rules = this.addRule({ type: "negative", negative: 0 });
        return this;
    }

    /**
     * fails if the  value does not contain a digit
     */
    containDigit: () => Validator = () => {
        this.rules = this.addRule({type:"containDigit", value:1})
        return this
    }

    containUppercase: () => Validator = () => {
        this.rules = this.addRule({type:"containUppercase", value:1})
        return this
    }

    containLowercase: () => Validator = () => {
        this.rules = this.addRule({type:"containLowercase", value:1})
        return this
    }

    

    /**
    * Fails if the value being validated is not equal to @param decimal
    */
    decimal: () => Validator = () => {
        this.rules = this.addRule({ type: "decimal", decimal: 0 });
        return this;
    }

    /**
    * Fails if the value being validated is equal to @param value.
    */
    notEquals: (value: string) => Validator = value => {
        this.rules = this.addRule({ type: "notEqual", value: value });
        return this;
    }

    /**
    * Fails if the string's length is less than @param min.
    */
    min: (min: number) => Validator = min => {
        this.rules = this.addRule({ type: "min", min: min });
        return this;
    }

    /**
    * Fails if the string's length is greater than @param max.
    */
    max: (max: number) => Validator = max => {
        this.rules = this.addRule({ type: "max", max: max });
        return this;
    }

    /**
    * Fails if the string is empty.
    */
    notEmpty: () => Validator = () => {
        // Set a min length of 1!
        this.rules = this.addRule({ type: "min", min: 1 });
        return this;
    }

    /**
    * Fails if the string is not empty.
    */
    empty: () => Validator = () => {
        // Set a max length of 0
        this.rules = this.addRule({ type: "max", max: 0 });
        return this;
    }

    /**
    * Fails if value is not a number.
    */
    isNumber: () => Validator = () => {
        this.rules = this.addRule({ type: "isNumber", isNumber: 'number' });
        return this;
    }

    /**
     * Fails if value is not a boolean.
    */
    isBoolean: () => Validator = () => {
        this.rules = this.addRule({ type: "isBoolean", isBoolean: 'boolean' });
        return this;
    }

    /**
     * Adds a rule to the array of rules, it replaces if it exists.
     */
    private addRule: (rule: Rule) => Rule[] = rule => {
        // Filter the current rule set, removing any rule that has the same type of the one being added
        // @ts-ignore: Object is possibly 'null'
        const filtered = this.rules.filter(r => r.type !== rule.type);

        // Add the new rule to the filtered rule array if it does not exist
        return [...filtered, rule]
    }


    /**
    * Check each rule against the value being validated.
    */
    //@ts-ignore
    checkRule: (rule: Rule, value: any, field: any) => Result<any> = (rule, value, field) => {
        const err = (msg: string) => ({ field: field, status: false, message: msg });
        const ok = () => ({ field: field, status: true, message: value });

        switch (rule.type) {

            case "equal": 
                return rule.value !== value 
                    ? err(`${field} was expected to be ${rule.value} but was ${value}.`) 
                    : ok();

            case "notEqual":
                return rule.value === value 
                    ? err(`${field} must not be ${rule.value}.`) 
                    : ok();

            case "min":
                return typeof value == "string" && value.length < rule.min 
                    ? err(`${field} must be a minimum of ${rule.min} but was ${value.length}.`) 
                    : typeof value == "number" && value < rule.min 
                    ? err(`${field} must be a minimum of ${rule.min} but was ${value}.`) : ok();

            case "max":
                return typeof value == "string" && value.length > rule.max 
                    ? err(`${field} must be a maximum of ${rule.max} but was ${value.length}.`) 
                    : typeof value == "number" && value > rule.max 
                    ? err(`${field} must be a maximum of  ${rule.max} but was ${value}.`) : ok();
            
            case "positive":
                return typeof value == "number" && value > rule.positive
                    ? err(`${field} must be Positive but was ${value}.`) 
                    : ok();

            case "negative":
                return typeof value == "number" && value < rule.negative
                    ? err(`${field} must be Negative but was ${value}.`) 
                    : ok();

            case "containDigit":
                return (/\d/.test(value)) ?
                    ok() : err(`${field} must contain a digit.`);

            case "containUppercase":
                return (/[A-Z]/.test(value)) ?
                    ok() : err(`${field} must contain a uppercase.`);

            case "containLowercase":
                return (/[a-z]/.test(value)) ?
                    ok() : err(`${field} must contain a lowercase.`);

            case "decimal":
                return typeof value == "number" && Number(value) === value && value % 1 !== rule.decimal
                    ? err(`${field} must be Decimal but was ${value}.`) 
                    : ok();

            case "digits":
                return typeof value == "number" && value.toString().length == rule.value
                    ? err(`${field} must be Digit but was ${value}.`) 
                    : ok();
            
            case "isNumber":
                return typeof value != rule.isNumber
                    ? err(`${field} must be Number but was ${typeof value}.`)
                    : ok();
            
            case "isBoolean":
                return typeof value != rule.isBoolean
                    ? err(`${field} must be Boolean but was ${typeof value}.`) 
                    : ok();

        } 
    }

    validate: (value: unknown, field: string) => Result<any> = (value, field) => {
    // Check that the type is string, boolean or boolean before validating each rule
    if (value === null) {
        return {
            field: null,
            status: false,
            message: "expected a string, boolean or number but received null."
        }       
    } else if (value === undefined) {
        return { 
            field: null,
            status: false,
            message: "expected a string, boolean or number but received undefined."
        }
    } else if(value == "object"){
        return {
            field: "No field",
            status: false,
            message: `expected a number, string or boolean but saw object.`
        }
    }

    // Iterate over all rules and return an error if any rule fails
    // @ts-ignore: Object is possibly 'null'
    for (let rule of this.rules) {
        const result = this.checkRule(rule, value, field);

        if (result.status === false) {
            return result;
        }     
    }

    // If none of the rules in the loop had an error, the value passed
    return {
        field: field,
        status: true,
        message: value
        
        }
    }

}
