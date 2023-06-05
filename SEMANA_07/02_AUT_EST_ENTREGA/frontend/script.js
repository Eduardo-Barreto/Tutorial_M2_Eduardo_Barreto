$(document).ready(function () {
    // URL base da API
    var baseUrl = "http://127.0.0.1:3031";

    // Função para buscar e exibir todas as experiências
    function listExperiences() {
        $.ajax({
            dataType: "json",
            url: baseUrl + "/experiences",
            method: "GET",
            success: function (response) {
                console.dir(response);
                response.forEach(function (experience) {
                    let newExperience = `<div class="experience-item">` +
                        `<h3><span class="experience-company">${experience.company_name}</span></h3>` +
                        `<p><span class="experience-role">${experience.role}</span></p>` +
                        `<p><span class="experience-description">${experience.description}</span></p>` +
                        `<p>Ano de Início: <span class="experience-start-year">${experience.start_year}</span></p>` +
                        `<p>Ano de Término: <span class="experience-end-year">${experience.end_year}</span></p>` +
                        `</div>`;
                    $("#experiences-list").append(newExperience);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    listExperiences();
});
