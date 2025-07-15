<script setup></script>
<template>
	<div>
		<div class="space-y-6"></div>
		<h2 class="text-2xl font-bold text-gray-900">Lorem Ipsum Dolor</h2>

		<p class="text-gray-700 leading-relaxed">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur.
		</p>

		<p class="text-gray-700 leading-relaxed">
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
			deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
			natus error sit voluptatem accusantium doloremque laudantium, totam rem
			aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
			beatae vitae dicta sunt explicabo.
		</p>

		<div class="overflow-x-auto">
			<table class="min-w-full border border-gray-300">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-4 py-2 border-b border-gray-300 text-left font-medium text-gray-900">
							Название
						</th>
						<th
							class="px-4 py-2 border-b border-gray-300 text-left font-medium text-gray-900">
							Описание
						</th>
						<th
							class="px-4 py-2 border-b border-gray-300 text-left font-medium text-gray-900">
							Статус
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover:bg-gray-50">
						<td class="px-4 py-2 border-b border-gray-200">Lorem ipsum</td>
						<td class="px-4 py-2 border-b border-gray-200">
							Dolor sit amet consectetur
						</td>
						<td class="px-4 py-2 border-b border-gray-200">Активный</td>
					</tr>
					<tr class="hover:bg-gray-50">
						<td class="px-4 py-2 border-b border-gray-200">Adipiscing elit</td>
						<td class="px-4 py-2 border-b border-gray-200">
							Sed do eiusmod tempor
						</td>
						<td class="px-4 py-2 border-b border-gray-200">Неактивный</td>
					</tr>
					<tr class="hover:bg-gray-50">
						<td class="px-4 py-2 border-b border-gray-200">
							Incididunt labore
						</td>
						<td class="px-4 py-2 border-b border-gray-200">
							Ut enim ad minim veniam
						</td>
						<td class="px-4 py-2 border-b border-gray-200">Ожидание</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
