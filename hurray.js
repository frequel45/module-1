const ruleButton = document.querySelector(".rule_btn");
const ruleWrapper = document.querySelector(".rule_wrapper");
const closeButton = document.querySelector(".close_btn");

let isRuleBoxOpen = true;
if (isRuleBoxOpen) {
  ruleWrapper.style.display = "none";
}
ruleButton.addEventListener("click", () => {
  if (isRuleBoxOpen) {
    ruleWrapper.style.display = "flex";
    isRuleBoxOpen = true;
  }
});
closeButton.addEventListener("click", () => {
  ruleWrapper.style.display = "none";
  isRuleBoxOpen = true;
});
