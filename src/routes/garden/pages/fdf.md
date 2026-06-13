---
title: Fil-de-Fer (FdF)
desc: FDF wireframe using MinilibX
tags: [coding, 42, project, C/C++]
date: 2026-06-13
---

# FdF

---

This was my favorite 42 project.  

I've made 3D wireframes creating my own functions for line drawing, rotation, perspective projection, and many other details.
The rendering was made entirely on the CPU, that made me realize how 3D works more deeply. And how to optimize some things,
like line drawing.  

In the start of the project I've made this:

<div class="grid">
    <div class="tile">
    <span class="name">With perspective</span>
    <video src="https://github.com/errgrab/fdf/raw/refs/heads/main/media/cube_with_perspective.mp4" autoplay loop muted playsinline class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px"></video></div><div class="tile">
    <span class="name">Without perspective</span>
    <video src="https://github.com/errgrab/fdf/raw/refs/heads/main/media/cube_without_perspective.mp4" autoplay loop muted playsinline class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px"></video></div>
</div>

---

Here my function to draw a single line:
```c
/* [Thnks Wikipedia!](https://en.wikipedia.org/wiki/Bresenham's_line_algorithm)
 *
 * This is one of the most important functions of this project. With the power
 * of drawing lines, I can draw triangles. You can make any shape with only
 * triangles.
 *
 * explanation of the implementation:
 * int **line is the same as int line[2][2]
 * line[0] is the first point of the line
 * line[1] is the seccond
 * line[0][X] gets the x position of the first line */
void	draw_line(t_fdf *fdf, int **line, int color)
{
	int	*dif;
	int	*dir;
	int	err;

	dif = (int [2]){
		abs(line[1][X] - line[0][X]),
		-abs(line[1][Y] - line[0][Y])};
	dir = (int [2]){
		_tern(line[0][X] < line[1][X], 1, -1),
		_tern(line[0][Y] < line[1][Y], 1, -1)};
	err = dif[X] + dif[Y];
	while (line[0][X] != line[1][X] || line[0][Y] != line[1][Y])
	{
		draw_pixel(fdf, line[0][X], line[0][Y], color);
		if (2 * err >= dif[Y] && line[0][X] != line[1][X])
		{
			err += dif[Y];
			line[0][X] += dir[X];
		}
		if (2 * err <= dif[X] && line[0][Y] != line[1][Y])
		{
			err += dif[X];
			line[0][Y] += dir[Y];
		}
	}
}
```

Knowing what I know today, I would have made lots of things in a different way.
But I think that is a good thing to say. Because I know that I evolved and that now I learned better ways of doing things.