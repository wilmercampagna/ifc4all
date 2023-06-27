import viteLogo from '../../public/vite.svg'

document.querySelector('#nav').appendChild = `
<div>
	<nav class="bg-white shadow-lg">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<!--Website Logo-->

					<a href="#" class="flex items-center py-4 px-2">
						<img src="${viteLogo}" alt="Logo" class="h-8 w-8 mr-2">
						<span class="font-semibold text-gray-500 text-lg">
							Navigation
						</span>
					</a>
				</div>
				<div class="hidden md:flex items-center space-x-1">
					<a href="" class="py-4 px-2 text-gray-500 border-b-4 border-purple-500 font-semibold">
						Home
					</a>
					<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
						Services
					</a>
					<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
						About
					</a>
					<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
						Contact Us
					</a>
				</div>

				<div class="md:hidden flex items-center">
					<button class="outline-none menu-button">
						<svg class="w-6 h-6 text-gray-500" x-show="! showMenu" fill="none" stroke-linecap="round"
							stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor">
							<path d="m4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>

				<div class="hidden mobile-menu">
					<ul class="">
						<li class="active">
							<a href="nav.html" class="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold">
								Home
						</li>
						<li>
							<a href="#services" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
								Services
							</a>
						</li>
						<li>
							<a href="#About" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
								About
							</a>
						</li>
						<li>
							<a href="#Contact Us" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
								Contact Us
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</div>
`;

const btn = document.querySelector('button.menu-button');
const menu = document.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
     menu.classList.toggle("hidden");
})