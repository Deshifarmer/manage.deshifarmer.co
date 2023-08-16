const nums = ["x", "x", "y", -1];

const count = {};
nums.forEach((x) => {
  count[x] = (count[x] || 0) + 1;
});

console.log(count);

const l1 = [2, 4, 3];
const l2 = [5, 6, 4];

const r1 = parseInt(l1.reverse().join(""));
const r2 = parseInt(l2.reverse().join(""));

const result = r1 + r2;
const revres = result.toString().split("");
console.log(revres.reverse());
