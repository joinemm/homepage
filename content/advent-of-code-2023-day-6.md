---
title: Advent of Code 2023 Day 6
abstract: Wait For It
published: true
date: 2023-12-06
image: day6.jpg
tags: [aoc, programming]
---

It's once again the best time of the year; [Advent of Code](https://adventofcode.com)! In this blog series I will be taking a look at all the puzzles of the year, and how I approached solving them.

You can find all of my solutions in my [git repo](https://git.joinemm.dev/advent-of-code/tree/master/2023).

## Day 6: Wait For It

Today we are taking a look at [Day 6](https://adventofcode.com/2023/day/6)

We need to find the amount of time to charge our boat to beat the best time. As soon as I read this puzzle, it was clear this was going to be a "solve x" math question.

The distance our boat travels can be expressed as a function of $x$, where $x$ is the amount of time we hold the button, and $t$ is the duration of the race.

$$
\begin{align*}
d &= x(t - x)
\end{align*}
$$

This can then be rearranged to form a quadratic equation:

$$
\begin{align*}
d &= x(t - x) \\
0 &= tx - x^2 - d \\
ax^2 - bx + c &= 0 \\
\end{align*}
$$

As you might remember from high-school, quadratic equations can be solved with the quadratic formula:

$$
\begin{align*}
&x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
\end{align*}
$$

Plugging our values in, we get two points for $x$, which are the bounds of our winning area. Now, these are floats, so they must be `ceil()` and `floor()`:ed. There is one edge case where the bounds have no fractions, which would give us the answer to *match* the current record. The goal is to beat the record, so `+1` is added to fix this.

## Python

In part 1 we solve the formula for each race and multiply the possibilities together to get our answer. For part 2, it's as simple as stripping out the whitespace and counting the formula once for the large numbers.

```py
from math import ceil, floor, sqrt

def quadratic_formula(a: int, b: int, c: int) -> tuple[int, int]:
    return [(-b - sqrt(b**2 - 4 * a * c) * i) / (2 * a) for i in [1, -1]]


def part1(input: str):
    times, distances = [
        [int(x) for x in line.split(":", 1)[1].split()] for line in input.split("\n")
    ]

    total = 1
    for time, distance in zip(times, distances):
        x1, x2 = quadratic_formula(1, time, distance)
        total *= ceil(x2) - floor(x1 + 1)

    return total


def part2(input: str):
    time, distance = [
        int("".join(line.split(":", 1)[1].split())) for line in input.split("\n")
    ]

    x1, x2 = quadratic_formula(1, time, distance)
    return ceil(x2) - floor(x1 + 1)
```
