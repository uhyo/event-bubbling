function gcd2(m: number, n: number): number {
  if (m < n) {
    [m, n] = [n, m];
  }
  while (n) {
    [m, n] = [n, m % n];
  }
  return m;
}

function lcm2(m: number, n: number): number {
  return (m * n) / gcd2(m, n);
}

export function gcd(...nums: number[]): number {
  return nums.reduce(gcd2);
}

export function lcm(...nums: number[]): number {
  return nums.reduce(lcm2, 1);
}
