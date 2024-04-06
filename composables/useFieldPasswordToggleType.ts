export function useToggleFieldPasswordType() {
  const togglePasswordFieldType = (node) => {
    node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
    node.props.type = node.props.type === "password" ? "text" : "password";
  };

  return { togglePasswordFieldType };
}
