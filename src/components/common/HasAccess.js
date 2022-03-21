import rules from '../../pbac_rules';

const check = (rule, plan, action) => {
    const permission = rules[plan];
    if(!permission) return false;

    return permission.includes(action);
}
const HasAccess = props =>
    check(rules, props.plan, props.perform) 
    ? props.yes()
    : props.no();

    HasAccess.defaultProps = {
        yes: () => null,
        no: () => null
    };

export default HasAccess