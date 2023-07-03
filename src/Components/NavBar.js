import viteLogo from '../../public/vite.svg'

const navBar = document.createElement('div');
navBar.innerHTML = `
<nav class="bg-white shadow-lg">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-7">
				<!--Website Logo-->
				<a href="/" class="flex items-center py-4 px-2">
					<img src="${viteLogo}" alt="Logo" class="h-8 w-8 mr-2">
					<span class="font-semibold text-gray-500 text-lg">
						ifc4All
					</span>
				</a>
			</div>
			<div class="hidden md:flex items-center space-x-1">
				<a href="/" class="py-4 px-2 text-gray-500 border-b-4 border-purple-500 font-semibold">
					ifcVR
				</a>
				<a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
					ifcAR
				</a>
				<a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
					ifcGames
				</a>
				<a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
					Bim 4D
				</a>
				<a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
					Bim 5D
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
						<a href="/" class="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold">
							Home
					</li>
					<li>
						<a href="/" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
							ifcVR
						</a>
					</li>
					<li>
						<a href="/" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
							ifcAR
						</a>
					</li>
					<li>
						<a href="/" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
							ifcGames
						</a>
						<li>
							<a href="/" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
								BIM4D
							</a>						
						</li>
						<li>
							<a href="/" class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
								BIM5D
							</a>						
						</li>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>
`;

const btn = navBar.querySelector('button.menu-button');
const menu = navBar.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
     menu.classList.toggle("hidden");
});

export default navBar;
